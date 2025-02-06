import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await db.Admin.findOne({ where: { username } });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};