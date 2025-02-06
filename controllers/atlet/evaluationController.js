// controllers/atlet/evaluasiController.js
import db from "../../models/index.js";

export const getAtletEvaluasi = async (req, res) => {
  try {
    const evaluasi = await db.Evaluasi.findAll({
      where: { atletId: req.user.id },
      include: [
        {
          model: db.LatihanAtlet,
          as: "latihanAtlet",
          include: [
            {
              model: db.KatalogLatihan,
              as: "katalogLatihan"
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    // Format the data for frontend
    const formattedEvaluasi = evaluasi.map(ev => {
      const data = ev.toJSON();
      return {
        id: data.id,
        createdAt: data.createdAt,
        jenisLatihan: data.latihanAtlet?.katalogLatihan?.jenisLatihan || "N/A",
        skor: data.skor,
        komentar: data.komentar,
        targetPencapaian: data.latihanAtlet?.katalogLatihan?.targetSkor || 70,
        totalRepetisiTercapai: data.latihanAtlet?.totalRepetisiTercapai,
        totalRepetisiTarget: data.latihanAtlet?.totalRepetisiTarget,
        persentaseKetercapaian: data.latihanAtlet?.persentaseKetercapaian
      };
    });

    res.json(formattedEvaluasi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};