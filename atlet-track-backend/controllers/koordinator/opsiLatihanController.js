// controllers/koordinator/opsiLatihanController.js
import db from '../../models/index.js';

// Get all exercise options for a specific catalog
export const getOpsiLatihan = async (req, res) => {
  const { katalogId } = req.params;
  try {
    const opsiLatihan = await db.OpsiLatihan.findAll({
      where: { 
        katalogLatihanId: katalogId 
      },
      include: [{
        model: db.KatalogLatihan,
        as: 'katalogLatihan',
        where: { koordinatorId: req.user.id }
      }]
    });
    res.json(opsiLatihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new exercise option
export const addOpsiLatihan = async (req, res) => {
  const { katalogId } = req.params;
  const { nama, durasi, repetisi, deskripsi, target, instruksi } = req.body;

  try {
    // Verify catalog belongs to coordinator
    const katalog = await db.KatalogLatihan.findOne({
      where: { 
        id: katalogId,
        koordinatorId: req.user.id 
      }
    });

    if (!katalog) {
      return res.status(404).json({ message: 'Katalog latihan tidak ditemukan' });
    }

    const opsiLatihan = await db.OpsiLatihan.create({
      nama,
      durasi,
      repetisi,
      deskripsi,
      target,
      instruksi,
      katalogLatihanId: katalogId
    });

    // Log activity
    await db.ActivityLog.create({
      action: `Menambahkan opsi latihan baru: ${nama} ke katalog ${katalog.nama}`,
      koordinatorId: req.user.id,
    });

    res.status(201).json(opsiLatihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update exercise option
export const updateOpsiLatihan = async (req, res) => {
  const { id } = req.params;
  try {
    const opsiLatihan = await db.OpsiLatihan.findOne({
      where: { id },
      include: [{
        model: db.KatalogLatihan,
        as: 'katalogLatihan',
        where: { koordinatorId: req.user.id }
      }]
    });

    if (!opsiLatihan) {
      return res.status(404).json({ message: 'Opsi latihan tidak ditemukan' });
    }

    await opsiLatihan.update(req.body);

    // Log activity
    await db.ActivityLog.create({
      action: `Mengupdate opsi latihan: ${opsiLatihan.nama}`,
      koordinatorId: req.user.id,
    });

    res.json(opsiLatihan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete exercise option
export const deleteOpsiLatihan = async (req, res) => {
  const { id } = req.params;
  try {
    const opsiLatihan = await db.OpsiLatihan.findOne({
      where: { id },
      include: [{
        model: db.KatalogLatihan,
        as: 'katalogLatihan',
        where: { koordinatorId: req.user.id }
      }]
    });

    if (!opsiLatihan) {
      return res.status(404).json({ message: 'Opsi latihan tidak ditemukan' });
    }

    await opsiLatihan.destroy();

    // Log activity
    await db.ActivityLog.create({
      action: `Menghapus opsi latihan: ${opsiLatihan.nama}`,
      koordinatorId: req.user.id,
    });

    res.json({ message: 'Opsi latihan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};