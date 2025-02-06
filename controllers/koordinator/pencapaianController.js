import db from '../../models/index.js';
// Pengelolaan Pencapaian
export const addPencapaian = async (req, res) => {
    const { atletId, nama, deskripsi } = req.body;
    try {
      // Pastikan atlet ada
      const atlet = await db.Atlet.findByPk(atletId);
      if (!atlet) {
        return res.status(404).json({ message: 'Atlet tidak ditemukan' });
      }
  
      // Buat pencapaian
      const pencapaian = await db.Pencapaian.create({
        nama,
        deskripsi,
        atletId,
        koordinatorId: req.user.id,
      });
  
      // Log Activity
      await db.ActivityLog.create({
        action: `Memberikan pencapaian "${nama}" kepada atlet ${atlet.nama}`,
        koordinatorId: req.user.id,
      });
  
      res.status(201).json(pencapaian);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Mengambil semua Pencapaian yang diberikan oleh Koordinator
  export const getPencapaianByKoordinator = async (req, res) => {
    try {
      const pencapaian = await db.Pencapaian.findAll({
        where: { koordinatorId: req.user.id },
        include: [{ model: db.Atlet, as: 'atlet' }],
      });
      res.json(pencapaian);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };