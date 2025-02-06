import db from '../../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const koordinatorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const koordinator = await db.Koordinator.findOne({ where: { email } });
    if (!koordinator) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, koordinator.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: koordinator.id, role: 'koordinator' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};