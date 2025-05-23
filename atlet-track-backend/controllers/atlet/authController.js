import db from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const atletLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const atlet = await db.Atlet.findOne({ where: { email } });
    if (!atlet) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, atlet.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: atlet.id, role: "atlet" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};