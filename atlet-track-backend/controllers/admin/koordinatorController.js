import db from '../../models/index.js';
import bcrypt from 'bcrypt';

// Get All Koordinator
export const getAllKoordinator = async (req, res) => {
  try {
    const koordinator = await db.Koordinator.findAll();
    res.json(koordinator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Koordinator
export const addKoordinator = async (req, res) => {
  const { nama, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newKoordinator = await db.Koordinator.create({
      nama,
      email,
      password: hashedPassword,
      adminId: req.user.id,
    });
    await db.ActivityLog.create({
      action: `Added Koordinator: ${newKoordinator.email}`,
      adminId: req.user.id,
    });
    res.status(201).json(newKoordinator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Koordinator
export const updateKoordinator = async (req, res) => {
  const { id } = req.params;
  const { nama, email, password } = req.body;
  try {
    const koordinator = await db.Koordinator.findByPk(id);
    if (!koordinator) {
      return res.status(404).json({ message: 'Koordinator not found' });
    }
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }
    await koordinator.update(req.body);
    await db.ActivityLog.create({
      action: `Updated Koordinator: ${koordinator.email}`,
      adminId: req.user.id,
    });
    res.json(koordinator);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Koordinator
export const deleteKoordinator = async (req, res) => {
  const { id } = req.params;
  try {
    const koordinator = await db.Koordinator.findByPk(id);
    if (!koordinator) {
      return res.status(404).json({ message: 'Koordinator not found' });
    }
    await koordinator.destroy();
    await db.ActivityLog.create({
      action: `Deleted Koordinator: ${koordinator.email}`,
      adminId: req.user.id,
    });
    res.json({ message: 'Koordinator deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Koordinator Password
export const resetKoordinatorPassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  try {
    const koordinator = await db.Koordinator.findByPk(id);
    if (!koordinator) {
      return res.status(404).json({ message: 'Koordinator not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await koordinator.update({ password: hashedPassword });
    await db.ActivityLog.create({
      action: `Reset Password for Koordinator: ${koordinator.email}`,
      adminId: req.user.id,
    });
    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};