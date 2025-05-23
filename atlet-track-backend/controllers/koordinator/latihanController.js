// controllers/koordinator/latihanController.js
import db from '../../models/index.js';

export const getCompletedLatihan = async (req, res) => {
  try {
    const completedLatihan = await db.LatihanAtlet.findAll({
      where: {
        status: 'COMPLETED'
      },
      include: [
        {
          model: db.Atlet,
          as: 'atlet',
          where: { koordinatorId: req.user.id },
          attributes: ['id', 'nama', 'cabangOlahraga'] // Added cabangOlahraga
        },
        {
          model: db.KatalogLatihan,
          as: 'katalogLatihan',
          attributes: [
            'id', 
            'nama', 
            'jenisLatihan',
            'tingkatKesulitan', // Added tingkatKesulitan
            'targetSkor'       // Added targetSkor
          ]
        }
      ],
      order: [['tanggalSelesai', 'DESC']]
    });

    res.json(completedLatihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};