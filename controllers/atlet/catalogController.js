// controllers/atlet/catalogController.js
import db from "../../models/index.js";

export const getAvailableCatalogs = async (req, res) => {
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);
    
    const catalogs = await db.KatalogLatihan.findAll({
      where: { koordinatorId: atlet.koordinatorId },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCatalogById = async (req, res) => {
  const { id } = req.params;
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);
    
    const catalog = await db.KatalogLatihan.findOne({
      where: { 
        id,
        koordinatorId: atlet.koordinatorId 
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });

    if (!catalog) {
      return res.status(404).json({ message: 'Katalog tidak ditemukan' });
    }

    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCatalogsByType = async (req, res) => {
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);
    const { jenisLatihan } = req.params;

    const catalogs = await db.KatalogLatihan.findAll({
      where: { 
        koordinatorId: atlet.koordinatorId,
        jenisLatihan 
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCatalogsByDifficulty = async (req, res) => {
  try {
    const atlet = await db.Atlet.findByPk(req.user.id);
    const { tingkatKesulitan } = req.params;

    const catalogs = await db.KatalogLatihan.findAll({
      where: { 
        koordinatorId: atlet.koordinatorId,
        tingkatKesulitan 
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};