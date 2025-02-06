// controllers/koordinator/evaluasiController.js
import db from "../../models/index.js";

const ASPEK_PENILAIAN = {
  KETAHANAN: {
    kriteria: [
      "Durasi latihan tanpa istirahat",
      "Konsistensi performa",
      "Daya tahan kardiovaskular",
      "Kemampuan recovery",
    ],
    targetMinimal: 70,
  },
  KEKUATAN: {
    kriteria: [
      "Beban maksimal yang dapat diangkat",
      "Jumlah repetisi dengan beban tetap",
      "Teknik pengangkatan",
      "Stabilitas gerakan",
    ],
    targetMinimal: 65,
  },
  KECEPATAN: {
    kriteria: [
      "Waktu eksekusi gerakan",
      "Akselerasi",
      "Kecepatan maksimal",
      "Konsistensi kecepatan",
    ],
    targetMinimal: 75,
  },
  KELINCAHAN: {
    kriteria: [
      "Kemampuan mengubah arah",
      "Keseimbangan",
      "Koordinasi gerakan",
      "Waktu reaksi",
    ],
    targetMinimal: 70,
  },
  KOORDINASI: {
    kriteria: [
      "Ketepatan gerakan",
      "Timing",
      "Keselarasan gerakan",
      "Efisiensi gerakan",
    ],
    targetMinimal: 75,
  },
};

export const addEvaluasi = async (req, res) => {
  const { atletId, latihanAtletId, skor, komentar } = req.body;
  try {
    // Check if evaluation already exists
    const existingEvaluasi = await db.Evaluasi.findOne({
      where: {
        latihanAtletId,
        koordinatorId: req.user.id,
      },
    });

    if (existingEvaluasi) {
      return res.status(400).json({
        message: "Latihan ini sudah dievaluasi",
      });
    }
    
    const latihan = await db.LatihanAtlet.findOne({
      where: { id: latihanAtletId },
      include: [
        {
          model: db.KatalogLatihan,
          as: "katalogLatihan",
        },
      ],
    });

    if (!latihan) {
      return res.status(404).json({ message: "Latihan tidak ditemukan" });
    }

    const jenisLatihan = latihan.katalogLatihan.jenisLatihan;
    const aspekPenilaian = ASPEK_PENILAIAN[jenisLatihan];

    // Hitung persentase ketercapaian
    const persentaseKetercapaian =
      (latihan.totalRepetisiTercapai / latihan.totalRepetisiTarget) * 100;

    const evaluasi = await db.Evaluasi.create({
      atletId,
      latihanAtletId,
      koordinatorId: req.user.id,
      jenisLatihan: latihan.katalogLatihan.jenisLatihan,
      skor,
      targetPencapaian: latihan.katalogLatihan.targetSkor,
      totalRepetisiTercapai: latihan.totalRepetisiTercapai,
      totalRepetisiTarget: latihan.totalRepetisiTarget,
      persentaseKetercapaian,
      komentar,
      // Add aspekPenilaian field
      aspekPenilaian: JSON.stringify({
        kriteria: aspekPenilaian.kriteria,
        targetMinimal: aspekPenilaian.targetMinimal,
      }),
    });

    await db.ActivityLog.create({
      action: `Menambahkan evaluasi untuk latihan ${latihan.katalogLatihan.nama}`,
      koordinatorId: req.user.id,
    });

    res.status(201).json(evaluasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvaluasi = async (req, res) => {
  try {
    const evaluasi = await db.Evaluasi.findAll({
      where: { koordinatorId: req.user.id },
      include: [
        {
          model: db.Atlet,
          as: "atlet",
          attributes: ["id", "nama"],
        },
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan",
              attributes: ["id", "nama", "jenisLatihan"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedEvaluasi = evaluasi.map((ev) => {
      const data = ev.toJSON();
      return {
        ...data,
        aspekPenilaian: JSON.parse(data.aspekPenilaian),
        kriteriaPenilaian: ASPEK_PENILAIAN[data.jenisLatihan],
      };
    });

    res.json(formattedEvaluasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvaluasi = async (req, res) => {
  const { id } = req.params;
  const { skor, komentar } = req.body;
  try {
    const evaluasi = await db.Evaluasi.findOne({
      where: {
        id,
        koordinatorId: req.user.id,
      },
      include: [
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan",
            },
          ],
        },
      ],
    });

    if (!evaluasi) {
      return res.status(404).json({ message: "Evaluasi tidak ditemukan" });
    }

    const jenisLatihan = evaluasi.latihanAtlet.katalogLatihan.jenisLatihan;
    const aspekPenilaian = ASPEK_PENILAIAN[jenisLatihan];

    if (skor < 0 || skor > 100) {
      return res
        .status(400)
        .json({ message: "Skor harus berada di antara 0 dan 100" });
    }

    // Update evaluation with aspekPenilaian
    await evaluasi.update({
      skor,
      komentar,
      aspekPenilaian: JSON.stringify({
        kriteria: aspekPenilaian.kriteria,
        targetMinimal: aspekPenilaian.targetMinimal,
      }),
    });

    // Log activity
    await db.ActivityLog.create({
      action: `Mengupdate evaluasi untuk ${evaluasi.latihanAtlet.katalogLatihan.nama}`,
      koordinatorId: req.user.id,
    });

    // Get updated evaluation with associations
    const updatedEvaluasi = await db.Evaluasi.findByPk(id, {
      include: [
        {
          model: db.Atlet,
          as: "atlet",
          attributes: ["id", "nama"],
        },
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan",
            },
          ],
        },
      ],
    });

    const formattedEvaluasi = {
      ...updatedEvaluasi.toJSON(),
      aspekPenilaian: JSON.parse(updatedEvaluasi.aspekPenilaian),
      kriteriaPenilaian: ASPEK_PENILAIAN[updatedEvaluasi.jenisLatihan],
    };

    res.json(formattedEvaluasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete evaluation
export const deleteEvaluasi = async (req, res) => {
  const { id } = req.params;
  try {
    const evaluasi = await db.Evaluasi.findOne({
      where: {
        id,
        koordinatorId: req.user.id,
      },
      include: [
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan",
            },
          ],
        },
      ],
    });

    if (!evaluasi) {
      return res.status(404).json({ message: "Evaluasi tidak ditemukan" });
    }

    // Log activity before deletion
    await db.ActivityLog.create({
      action: `Menghapus evaluasi untuk ${evaluasi.latihanAtlet.katalogLatihan.nama}`,
      koordinatorId: req.user.id,
    });

    // Delete evaluation
    await evaluasi.destroy();

    res.json({ message: "Evaluasi berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
