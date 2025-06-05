import db from "../../models/index.js";
// Import Sequelize if you need to access Op or other specific Sequelize features directly
// import { Op } from "sequelize";

// Start a new training session
export const startLatihan = async (req, res) => {
  const { katalogId } = req.params;
  const atletId = req.user.id;

  // Initialize transaction
  // Make sure db.sequelize is your initialized Sequelize instance
  const transaction = await db.sequelize.transaction();

  try {
    // Check if athlete already has an ongoing training WITHIN the transaction
    const existingLatihan = await db.LatihanAtlet.findOne({
      where: {
        atletId: atletId,
        status: "ONGOING",
      },
      transaction, // Pass transaction to this query
    });

    if (existingLatihan) {
      await transaction.rollback(); // Rollback because an ongoing session already exists
      return res.status(400).json({
        message:
          "Anda masih memiliki latihan yang sedang berlangsung. Selesaikan terlebih dahulu.",
      });
    }

    // Get the catalog with its training options
    // This can also be part of the transaction if desired, but often not strictly necessary for reads like this
    // if they don't influence the core logic of "create if not exists".
    const katalog = await db.KatalogLatihan.findByPk(katalogId, {
      include: [
        {
          model: db.OpsiLatihan,
          as: "opsiLatihan",
          order: [["urutan", "ASC"]], // Order by sequence
        },
      ],
      // transaction, // Optionally include in transaction
    });

    if (!katalog) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: "Katalog latihan tidak ditemukan." });
    }

    if (!katalog.opsiLatihan || katalog.opsiLatihan.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        message:
          "Katalog latihan ini belum memiliki opsi latihan yang tersedia.",
      });
    }

    // Calculate total target repetitions
    const totalRepetisiTarget = katalog.opsiLatihan.reduce(
      (total, opsi) => total + (opsi.repetisi || 0),
      0
    );

    // Initialize progress for each training option
    const progressLatihan = katalog.opsiLatihan.map((opsi) => ({
      opsiId: opsi.id,
      nama: opsi.nama,
      selesai: false,
      sedangBerjalan: false,
      durasi: 0, // Duration in seconds
      repetisi: 0, // Completed repetitions
      targetTercapai: false,
      waktuMulai: null,
    }));

    // Create the training session WITHIN the transaction
    const latihanBaru = await db.LatihanAtlet.create(
      {
        atletId: atletId,
        katalogLatihanId: katalogId,
        status: "ONGOING",
        tanggalMulai: new Date(),
        currentOpsiIndex: 0,
        progressLatihan: progressLatihan, // Ensure this is a JSON/JSONB column
        totalRepetisiTercapai: 0,
        totalRepetisiTarget: totalRepetisiTarget,
      },
      { transaction } // Pass transaction to create
    );

    // If all operations were successful, commit the transaction
    await transaction.commit();

    // Get the complete training data to return (after commit)
    // This ensures we return the data that was actually committed
    const newLatihan = await db.LatihanAtlet.findByPk(latihanBaru.id, {
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [
            {
              model: db.OpsiLatihan,
              as: "opsiLatihan",
              order: [["urutan", "ASC"]],
            },
          ],
        },
      ],
    });

    // Log activity for the athlete
    console.log(`Athlete ${atletId} started training: ${katalog.nama}`);

    res.status(201).json(newLatihan);
  } catch (error) {
    // If any error occurred, rollback the transaction
    if (transaction) await transaction.rollback();
    console.error("Start latihan error:", error);
    res
      .status(500)
      .json({ message: "Gagal memulai latihan: " + error.message });
  }
};

export const startOpsiLatihan = async (req, res) => {
  const { latihanId } = req.params;
  const atletId = req.user.id;

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: atletId, // Ensure it's the athlete's own session
        status: "ONGOING",
      },
    });

    if (!latihan) {
      return res
        .status(404)
        .json({
          message: "Latihan aktif tidak ditemukan atau bukan milik Anda.",
        });
    }

    let progressLatihan = Array.isArray(latihan.progressLatihan)
      ? [...latihan.progressLatihan] // Create a new array to avoid direct mutation issues if any
      : [];

    if (
      latihan.currentOpsiIndex >= progressLatihan.length ||
      latihan.currentOpsiIndex < 0
    ) {
      return res
        .status(400)
        .json({ message: "Indeks opsi latihan saat ini tidak valid." });
    }

    const currentOpsiProgress = progressLatihan[latihan.currentOpsiIndex];

    if (!currentOpsiProgress) {
      return res
        .status(400)
        .json({ message: "Detail opsi latihan saat ini tidak ditemukan." });
    }
    if (currentOpsiProgress.selesai) {
      return res
        .status(400)
        .json({ message: "Opsi latihan saat ini sudah selesai." });
    }
    if (currentOpsiProgress.sedangBerjalan) {
      return res
        .status(400)
        .json({ message: "Opsi latihan saat ini sudah sedang berjalan." });
    }

    // Update the specific option's progress
    progressLatihan[latihan.currentOpsiIndex] = {
      ...currentOpsiProgress,
      sedangBerjalan: true,
      waktuMulai: new Date().toISOString(), // Record start time
      // durasi and repetisi for this option are reset/handled by updateProgress later
    };

    await latihan.update({ progressLatihan }); // Save the updated progress array

    // Fetch the updated LatihanAtlet to return the latest state including associations
    const updatedLatihan = await db.LatihanAtlet.findByPk(latihan.id, {
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
        },
      ],
    });

    res.json(updatedLatihan);
  } catch (error) {
    console.error("Start opsi latihan error:", error);
    res
      .status(500)
      .json({ message: "Gagal memulai opsi latihan: " + error.message });
  }
};

export const updateProgress = async (req, res) => {
  const { latihanId } = req.params;
  const { repetisi, forceComplete } = req.body; // repetisi is for the current attempt
  const atletId = req.user.id;

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: atletId,
        status: "ONGOING",
      },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
        },
      ],
    });

    if (!latihan) {
      return res.status(404).json({ message: "Latihan aktif tidak ditemukan." });
    }
    if (!latihan.katalogLatihan || !latihan.katalogLatihan.opsiLatihan) {
      return res
        .status(500)
        .json({
          message: "Data katalog latihan atau opsi latihan tidak lengkap.",
        });
    }

    let progressLatihan = Array.isArray(latihan.progressLatihan)
      ? [...latihan.progressLatihan]
      : [];
    if (
      latihan.currentOpsiIndex >= progressLatihan.length ||
      latihan.currentOpsiIndex < 0
    ) {
      return res
        .status(400)
        .json({ message: "Indeks opsi latihan saat ini tidak valid." });
    }

    const currentProgressOpsi = progressLatihan[latihan.currentOpsiIndex];
    const opsiDetail = latihan.katalogLatihan.opsiLatihan.find(
      (o) => o.id === currentProgressOpsi.opsiId
    );

    if (!currentProgressOpsi) {
      return res
        .status(400)
        .json({ message: "Progress opsi latihan saat ini tidak ditemukan." });
    }
    if (!opsiDetail) {
      return res
        .status(404)
        .json({
          message:
            "Detail untuk opsi latihan saat ini tidak ditemukan di katalog.",
        });
    }

    if (!currentProgressOpsi.sedangBerjalan) {
      return res
        .status(400)
        .json({
          message: "Opsi latihan belum dimulai. Mulai terlebih dahulu.",
        });
    }

    const waktuMulaiOpsi = new Date(currentProgressOpsi.waktuMulai);
    const durasiTerlewatiDetikSegment = Math.floor(
      (new Date() - waktuMulaiOpsi) / 1000
    );

    const newRepetisiOpsi =
      (currentProgressOpsi.repetisi || 0) + (parseInt(repetisi, 10) || 0);
    const newDurasiOpsi =
      (currentProgressOpsi.durasi || 0) + durasiTerlewatiDetikSegment;

    let opsiSelesai = false;
    if (forceComplete) {
      opsiSelesai = true;
    } else {
      // Check if target repetitions for the option are met
      const targetRepetisiTercapai =
        opsiDetail.repetisi > 0 && newRepetisiOpsi >= opsiDetail.repetisi;
      // Check if target duration for the option is met (opsiDetail.durasi is in minutes)
      const targetDurasiTercapai =
        opsiDetail.durasi > 0 && newDurasiOpsi >= opsiDetail.durasi * 60;

      if (opsiDetail.repetisi > 0 && opsiDetail.durasi > 0) {
        opsiSelesai = targetRepetisiTercapai && targetDurasiTercapai;
      } else if (opsiDetail.repetisi > 0) {
        opsiSelesai = targetRepetisiTercapai;
      } else if (opsiDetail.durasi > 0) {
        opsiSelesai = targetDurasiTercapai;
      } else {
        // If no target repetisi or durasi, option is considered done when manually marked (e.g. forceComplete)
        // or if it's a "do once" type. For now, assume it's not auto-completed without targets.
        opsiSelesai = false; // Or true if any interaction means completion without specific targets
      }
    }

    progressLatihan[latihan.currentOpsiIndex] = {
      ...currentProgressOpsi,
      selesai: opsiSelesai,
      sedangBerjalan: false, // Option attempt is now finished
      durasi: newDurasiOpsi, // Update accumulated duration
      repetisi: newRepetisiOpsi, // Update accumulated repetitions
      targetTercapai: // This flag indicates if this specific option's targets were met
        (opsiDetail.repetisi > 0 && newRepetisiOpsi >= opsiDetail.repetisi) ||
        (opsiDetail.durasi > 0 && newDurasiOpsi >= opsiDetail.durasi * 60),
      waktuMulai: null, // Clear start time for the segment
    };

    let newCurrentOpsiIndex = latihan.currentOpsiIndex;
    if (opsiSelesai && latihan.currentOpsiIndex < progressLatihan.length - 1) {
      newCurrentOpsiIndex += 1; // Move to next option if current one is completed and not the last
    }

    const totalRepetisiTercapaiKeseluruhan = progressLatihan.reduce(
      (total, opsi) => total + (opsi.repetisi || 0),
      0
    );

    const updateData = {
      progressLatihan: progressLatihan,
      currentOpsiIndex: newCurrentOpsiIndex,
      totalRepetisiTercapai: totalRepetisiTercapaiKeseluruhan,
    };

    // Check if all options in the training are completed
    const semuaSelesai = progressLatihan.every((opsi) => opsi.selesai);
    if (semuaSelesai) {
      updateData.status = "COMPLETED";
      updateData.tanggalSelesai = new Date();
      // Ensure currentOpsiIndex is valid if all are complete (e.g., last index)
      updateData.currentOpsiIndex = Math.max(0, progressLatihan.length -1);

    }

    await latihan.update(updateData);

    const updatedLatihan = await db.LatihanAtlet.findByPk(latihan.id, {
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
        },
      ],
    });

    res.json(updatedLatihan);
  } catch (error) {
    console.error("Update progress error:", error);
    res
      .status(500)
      .json({ message: "Gagal memperbarui progress: " + error.message });
  }
};

export const completeLatihan = async (req, res) => {
  const { latihanId } = req.params;
  const atletId = req.user.id;

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: atletId,
        // status: "ONGOING", // Allow completing even if already COMPLETED (idempotency) or other states
      },
    });

    if (!latihan) {
      return res
        .status(404)
        .json({ message: "Latihan tidak ditemukan atau bukan milik Anda." });
    }

    // If already completed, just return current data
    if (latihan.status === "COMPLETED") {
      const currentLatihanData = await db.LatihanAtlet.findByPk(latihan.id, {
        include: [
          {
            model: db.KatalogLatihan,
            as: "katalogLatihan",
            include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
          },
        ],
      });
      return res.json(currentLatihanData);
    }

    // Mark all options as selesai, update totals
    let progressLatihan = Array.isArray(latihan.progressLatihan)
      ? [...latihan.progressLatihan]
      : [];
    const updatedProgressLatihan = progressLatihan.map((opsi) => ({
      ...opsi,
      selesai: true,
      sedangBerjalan: false, // Ensure no option is marked as running
      waktuMulai: null, // Clear any running start times
      // Keep existing repetisi and durasi, or recalculate if needed based on force complete logic
    }));

    const totalRepetisiTercapaiKeseluruhan = updatedProgressLatihan.reduce(
      (total, opsi) => total + (opsi.repetisi || 0),
      0
    );
    // Optionally, update total duration if tracked

    await latihan.update({
      status: "COMPLETED",
      tanggalSelesai: latihan.tanggalSelesai || new Date(), // Use existing if somehow set, else now
      progressLatihan: updatedProgressLatihan,
      totalRepetisiTercapai: totalRepetisiTercapaiKeseluruhan,
      currentOpsiIndex: Math.max(0, updatedProgressLatihan.length - 1), // Point to last option
    });

    const updatedLatihan = await db.LatihanAtlet.findByPk(latihan.id, {
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
        },
      ],
    });

    res.json(updatedLatihan);
  } catch (error) {
    console.error("Complete latihan error:", error);
    res
      .status(500)
      .json({ message: "Gagal menyelesaikan latihan: " + error.message });
  }
};

export const getOngoingLatihan = async (req, res) => {
  const atletId = req.user.id;

  try {
    const ongoingLatihan = await db.LatihanAtlet.findOne({
      where: {
        atletId: atletId,
        status: "ONGOING",
      },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan", order: [["urutan", "ASC"]] }],
        },
      ],
    });

    if (ongoingLatihan) {
      res.json(ongoingLatihan);
    } else {
      res.json(null); // Explicitly return null if no ongoing session
    }
  } catch (error) {
    console.error("Get ongoing latihan error:", error);
    res
      .status(500)
      .json({ message: "Gagal mengambil latihan berlangsung: " + error.message });
  }
};

export const getLatihanHistory = async (req, res) => {
  const atletId = req.user.id;
  try {
    const latihanHistory = await db.LatihanAtlet.findAll({
      where: {
        atletId: atletId,
        status: "COMPLETED",
      },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [
            {
              model: db.OpsiLatihan,
              as: "opsiLatihan",
              // order: [["urutan", "ASC"]], // Order options within each history item
            },
          ],
        },
      ],
      order: [["tanggalSelesai", "DESC"]], // Order history items by completion date
    });

    // Sequelize typically handles JSON parsing from DB for JSON/JSONB fields automatically with .get({ plain: true })
    // or when accessing properties. The explicit parsing/warning might not be needed if models are set up correctly.
    // For safety, if you've faced issues, you can keep a check or ensure models define getters.
    const parsedLatihanHistory = latihanHistory.map((l) => {
      const record = l.get({ plain: true });
      if (typeof record.progressLatihan === 'string') {
        try {
          record.progressLatihan = JSON.parse(record.progressLatihan);
        } catch (e) {
          console.warn(`Failed to parse progressLatihan for Latihan ID ${record.id}, setting to empty array.`);
          record.progressLatihan = [];
        }
      }
      if (!Array.isArray(record.progressLatihan)) {
        // console.warn(`progressLatihan for Latihan ID ${record.id} was not an array after potential parse, ensuring it is.`);
        record.progressLatihan = [];
      }
      return record;
    });


    res.json(parsedLatihanHistory);
  } catch (error) {
    console.error("Get latihan history error:", error);
    res
      .status(500)
      .json({ message: "Gagal mengambil histori latihan: " + error.message });
  }
};
