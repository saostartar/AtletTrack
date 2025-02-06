import db from "../../models/index.js";
import bcrypt from "bcrypt";

export const getAtletProfile = async (req, res) => {
  try {
    const atlet = await db.Atlet.findByPk(req.user.id, {
      attributes: ["id", "nama", "email", "grupId"],
      include: [{ model: db.GrupSesi, as: "GrupSesi" }],
    });
    if (!atlet) {
      return res.status(404).json({ message: "Atlet tidak ditemukan" });
    }
    res.json(atlet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAtletProfile = async (req, res) => {
  const { nama, email, password, grupId } = req.body;
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);
    if (!atlet) {
      return res.status(404).json({ message: "Atlet tidak ditemukan" });
    }
    atlet.nama = nama || atlet.nama;
    atlet.email = email || atlet.email;
    if (password) {
      atlet.password = bcrypt.hashSync(password, 10);
    }
    atlet.grupId = grupId || atlet.grupId;
    await atlet.save();
    res.json({ message: "Profil atlet berhasil diperbarui", atlet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};