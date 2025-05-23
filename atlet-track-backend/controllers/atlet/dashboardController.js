// controllers/atlet/dashboardController.js
import db from "../../models/index.js";

export const getAtletDashboard = async (req, res) => {
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);

    // Get recent evaluations
    const evaluasiTerkini = await db.Evaluasi.findAll({
      where: { atletId: req.user.id },
      limit: 5,
      order: [["createdAt", "DESC"]],
    });

    // Get training progress (average scores by date)
    const progressPelatihan = await db.Evaluasi.findAll({
      attributes: [
        [db.Sequelize.fn("DATE_FORMAT", db.Sequelize.col("createdAt"), "%Y-%m-%d"), "date"],
        [db.Sequelize.fn("AVG", db.Sequelize.col("skor")), "avgScore"],
      ],
      where: { atletId: req.user.id },
      group: ["date"],
      order: [["date", "ASC"]],
      limit: 5
    });

    res.json({
      progressPelatihan,
      evaluasiTerkini
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};