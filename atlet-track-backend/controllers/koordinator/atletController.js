import db from '../../models/index.js';
import bcrypt from 'bcrypt';

// Create Atlet
export const createAtlet = async (req, res) => {
  const { nama, email, password, cabangOlahraga } = req.body;
  try {
    const existingAtlet = await db.Atlet.findOne({ where: { email } });
    if (existingAtlet) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const atlet = await db.Atlet.create({
      nama,
      email,
      password: hashedPassword,
      cabangOlahraga,
      koordinatorId: req.user.id
    });

    // Log activity
    await db.ActivityLog.create({
      action: `Menambahkan atlet baru: ${nama}`,
      koordinatorId: req.user.id
    });

    res.status(201).json(atlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read All Atlet
export const getAllAtlet = async (req, res) => {
  try {
    const atlets = await db.Atlet.findAll({
      where: { koordinatorId: req.user.id }
    });
    res.json(atlets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Read Single Atlet
export const getAtletById = async (req, res) => {
  const { id } = req.params;
  try {
    const atlet = await db.Atlet.findOne({ 
      where: { 
        id, 
        koordinatorId: req.user.id 
      } 
    });
    
    if (!atlet) {
      return res.status(404).json({ message: 'Atlet tidak ditemukan' });
    }
    res.json(atlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Atlet
export const updateAtlet = async (req, res) => {
  const { id } = req.params;
  const { nama, email, password, cabangOlahraga } = req.body;
  try {
    const atlet = await db.Atlet.findOne({ 
      where: { 
        id, 
        koordinatorId: req.user.id 
      } 
    });

    if (!atlet) {
      return res.status(404).json({ message: 'Atlet tidak ditemukan' });
    }

    // Check email uniqueness if email is being updated
    if (email && email !== atlet.email) {
      const existingAtlet = await db.Atlet.findOne({ where: { email } });
      if (existingAtlet) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }
      atlet.email = email;
    }

    // Update fields if provided
    if (password) {
      atlet.password = await bcrypt.hash(password, 10);
    }
    if (nama) atlet.nama = nama;
    if (cabangOlahraga) atlet.cabangOlahraga = cabangOlahraga;

    await atlet.save();

    // Log activity
    await db.ActivityLog.create({
      action: `Mengupdate data atlet: ${atlet.nama}`,
      koordinatorId: req.user.id
    });

    res.json(atlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Atlet
export const deleteAtlet = async (req, res) => {
  const { id } = req.params;
  
  // Use transaction to ensure data consistency
  const transaction = await db.sequelize.transaction();
  
  try {
    const atlet = await db.Atlet.findOne({ 
      where: { 
        id, 
        koordinatorId: req.user.id 
      } 
    }, { transaction });
    
    if (!atlet) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Atlet tidak ditemukan' });
    }

    // Delete related conversations first
    await db.Conversation.destroy({
      where: { atletId: id }
    }, { transaction });

    // Log activity before deletion
    await db.ActivityLog.create({
      action: `Menghapus atlet: ${atlet.nama}`,
      koordinatorId: req.user.id
    }, { transaction });

    // Now delete the athlete
    await atlet.destroy({ transaction });
    
    // Commit the transaction
    await transaction.commit();
    
    res.json({ message: 'Atlet berhasil dihapus' });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    res.status(500).json({ message: error.message });
  }
};