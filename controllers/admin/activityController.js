import db from '../../models/index.js';

export const getActivityLogs = async (req, res) => {
  try {
    const logs = await db.ActivityLog.findAll({
      include: [{ model: db.Admin }, { model: db.Koordinator }],
      order: [['timestamp', 'DESC']],
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};