import db from "../../models/index.js";

export const getPencapaianAtlet = async (req, res) => {
  try {
    const pencapaian = await db.Pencapaian.findAll({
      where: { atletId: req.user.id },
      include: [
        {
          model: db.Koordinator,
          as: "koordinator",
          attributes: ["id", "nama", "email"],
        },
      ],
      order: [["tanggal", "DESC"]],
    });
    res.json(pencapaian);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};