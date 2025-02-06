// controllers/koordinator/koordinatorController.js
import db from '../../models/index.js';

export const getAllKoordinators = async (req, res) => {
  try {
    const koordinators = await db.Koordinator.findAll({
      attributes: ['id', 'nama', 'email'],
      order: [['nama', 'ASC']],
    });
    res.json(koordinators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKoordinatorDashboard = async (req, res) => {
  try {
    // Get number of athletes
    const jumlahAtlet = await db.Atlet.count({ 
      where: { koordinatorId: req.user.id } 
    });

    // Get number of exercise catalogs instead of training sessions
    const jumlahKatalog = await db.KatalogLatihan.count({
      where: { koordinatorId: req.user.id }
    });

    // Get recent evaluations
    const evaluasiTerkini = await db.Evaluasi.findAll({
      where: { koordinatorId: req.user.id },
      include: [{ 
        model: db.Atlet, 
        as: 'atlet',
        attributes: ['id', 'nama'] 
      }],
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    // Performance graph: Average Score per Month
    const performa = await db.Evaluasi.findAll({
      attributes: [
        [db.Sequelize.fn('DATE_FORMAT', db.Sequelize.col('createdAt'), '%Y-%m'), 'month'],
        [db.Sequelize.fn('AVG', db.Sequelize.col('skor')), 'avgScore'],
      ],
      where: { koordinatorId: req.user.id },
      group: ['month'],
      order: [['month', 'ASC']],
    });

    res.json({
      jumlahAtlet,
      jumlahKatalog, // Changed from sesiPelatihan to jumlahKatalog
      evaluasiTerkini,
      performa,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};