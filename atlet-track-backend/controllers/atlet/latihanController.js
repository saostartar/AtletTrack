import db from "../../models/index.js";

// Start a new training session
export const startLatihan = async (req, res) => {
  const { katalogId } = req.params;
  const atletId = req.user.id;

  try {
    // Check for ongoing exercise
    const ongoingLatihan = await db.LatihanAtlet.findOne({
      where: {
        atletId: atletId,
        status: "ONGOING",
      },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan" }],
        },
      ],
    });

    // If there's an ongoing exercise
    if (ongoingLatihan) {
      // If it's the same catalog, return existing session
      if (ongoingLatihan.katalogLatihanId === parseInt(katalogId)) {
        return res.status(200).json(ongoingLatihan);
      }
      // If different catalog, return error
      return res.status(400).json({
        message:
          "Anda memiliki latihan lain yang sedang berlangsung. Selesaikan terlebih dahulu.",
      });
    }

    // If no ongoing exercise, get catalog details
    const katalogLatihan = await db.KatalogLatihan.findByPk(katalogId, {
      include: [{ model: db.OpsiLatihan, as: "opsiLatihan" }],
    });

    if (!katalogLatihan) {
      return res
        .status(404)
        .json({ message: "Katalog latihan tidak ditemukan" });
    }

    // Create new training session
    const newLatihan = await db.LatihanAtlet.create({
      atletId,
      katalogLatihanId: katalogId,
      status: "ONGOING",
      tanggalMulai: new Date(),
      currentOpsiIndex: 0,
      progressLatihan: katalogLatihan.opsiLatihan.map((opsi) => ({
        opsiId: opsi.id,
        nama: opsi.nama,
        selesai: false,
        sedangBerjalan: false,
        durasi: 0,
        repetisi: 0,
      })),
    });

    // Get complete training data with associations
    const latihanWithKatalog = await db.LatihanAtlet.findByPk(newLatihan.id, {
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan" }],
        },
      ],
    });

    // Log activity
    await db.ActivityLog.create({
      action: `Memulai latihan baru: ${katalogLatihan.nama}`,
      atletId: req.user.id,
    });

    return res.status(201).json(latihanWithKatalog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const startOpsiLatihan = async (req, res) => {
  const { latihanId } = req.params;

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: req.user.id,
        status: "ONGOING",
      },
    });

    if (!latihan) {
      return res.status(404).json({ message: "Latihan tidak ditemukan" });
    }

    let progressLatihan = latihan.progressLatihan;
    const currentOpsi = progressLatihan[latihan.currentOpsiIndex];

    if (!currentOpsi || currentOpsi.selesai) {
      return res
        .status(400)
        .json({ message: "Opsi latihan saat ini sudah selesai" });
    }

    progressLatihan[latihan.currentOpsiIndex] = {
      ...currentOpsi,
      sedangBerjalan: true,
      waktuMulai: new Date().toISOString(),
    };

    await latihan.update({ progressLatihan });

    res.json({
      ...latihan.get(),
      progressLatihan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProgress = async (req, res) => {
  const { latihanId } = req.params;
  const { repetisi, forceComplete } = req.body; // Add forceComplete parameter

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: req.user.id,
        status: "ONGOING",
      },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan" }],
        },
      ],
    });

    if (!latihan) {
      return res.status(404).json({ message: "Latihan tidak ditemukan" });
    }

    let progressLatihan = latihan.progressLatihan;
    const currentOpsi = progressLatihan[latihan.currentOpsiIndex];
    const opsiDetail = latihan.katalogLatihan.opsiLatihan.find(
      (o) => o.id === currentOpsi.opsiId
    );

    if (!currentOpsi.sedangBerjalan) {
      return res.status(400).json({ message: "Opsi latihan belum dimulai" });
    }

    const waktuMulai = new Date(currentOpsi.waktuMulai);
    const durasiTerlewati = Math.floor((new Date() - waktuMulai) / 1000 / 60);

    // Update current option progress
    progressLatihan[latihan.currentOpsiIndex] = {
      ...currentOpsi,
      selesai: forceComplete || (durasiTerlewati >= opsiDetail.durasi || repetisi >= opsiDetail.repetisi),
      sedangBerjalan: false,
      durasi: Math.min(durasiTerlewati, opsiDetail.durasi),
      repetisi: repetisi,
      targetTercapai: repetisi >= opsiDetail.repetisi
    };

    // Move to next option if current one is completed
    if (progressLatihan[latihan.currentOpsiIndex].selesai && 
        latihan.currentOpsiIndex < progressLatihan.length - 1) {
      latihan.currentOpsiIndex += 1;
    }

    // Calculate total repetitions for evaluation purposes
    const totalRepetisi = progressLatihan.reduce((total, opsi) => total + (opsi.repetisi || 0), 0);
    const totalTargetRepetisi = latihan.katalogLatihan.opsiLatihan.reduce(
      (total, opsi) => total + opsi.repetisi, 0
    );

    await latihan.update({
      progressLatihan,
      currentOpsiIndex: latihan.currentOpsiIndex,
      totalRepetisiTercapai: totalRepetisi,
      totalRepetisiTarget: totalTargetRepetisi
    });

    // Check if all options are completed
    const semuaSelesai = progressLatihan.every((opsi) => opsi.selesai);
    if (semuaSelesai) {
      await latihan.update({
        status: "COMPLETED",
        tanggalSelesai: new Date()
      });
    }

    res.json({
      ...latihan.get(),
      progressLatihan: latihan.progressLatihan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete training session
export const completeLatihan = async (req, res) => {
  const { latihanId } = req.params;

  try {
    const latihan = await db.LatihanAtlet.findOne({
      where: {
        id: latihanId,
        atletId: req.user.id,
        status: "ONGOING",
      },
    });

    if (!latihan) {
      return res.status(404).json({ message: "Latihan tidak ditemukan" });
    }

    await latihan.update({
      status: "COMPLETED",
      tanggalSelesai: new Date(),
    });

    res.json({
      ...latihan.get(),
      progressLatihan: latihan.progressLatihan,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get ongoing training session
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
          include: [{ model: db.OpsiLatihan, as: "opsiLatihan" }],
        },
      ],
    });

    if (ongoingLatihan) {
      res.json(ongoingLatihan);
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLatihanHistory = async (req, res) => {
  try {
    const latihan = await db.LatihanAtlet.findAll({
      where: { 
        atletId: req.user.id,
        status: 'COMPLETED' // Only fetch completed trainings
      },
      include: [{
        model: db.KatalogLatihan,
        as: 'katalogLatihan',
        include: [{
          model: db.OpsiLatihan,
          as: 'opsiLatihan'
        }]
      }],
      order: [['tanggalSelesai', 'DESC']] // Order by completion date
    });

    const parsedLatihan = latihan.map(l => {
      const record = l.get({ plain: true });
      try {
        record.progressLatihan = typeof record.progressLatihan === 'string' 
          ? JSON.parse(record.progressLatihan) 
          : record.progressLatihan;
      } catch (error) {
        record.progressLatihan = [];
      }
      return record;
    });

    res.json(parsedLatihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};