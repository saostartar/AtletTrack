// controllers/koordinator/katalogLatihanController.js
import db from '../../models/index.js';

const JENIS_LATIHAN = {
  KETAHANAN: {
    targetMinimal: 70,
    deskripsiTarget: "Target untuk latihan ketahanan adalah konsistensi dalam durasi dan intensitas"
  },
  KEKUATAN: {
    targetMinimal: 65,
    deskripsiTarget: "Target untuk latihan kekuatan adalah pencapaian beban dan repetisi yang ditentukan"
  },
  KECEPATAN: {
    targetMinimal: 75,
    deskripsiTarget: "Target untuk latihan kecepatan adalah waktu eksekusi dan konsistensi gerakan"
  },
  KELINCAHAN: {
    targetMinimal: 70,
    deskripsiTarget: "Target untuk latihan kelincahan adalah kemampuan mengubah arah dengan cepat dan tepat"
  },
  KOORDINASI: {
    targetMinimal: 75,
    deskripsiTarget: "Target untuk latihan koordinasi adalah ketepatan dan keselarasan gerakan"
  }
};

// Mendapatkan semua katalog latihan
export const getAllKatalogLatihan = async (req, res) => {
  try {
    const katalog = await db.KatalogLatihan.findAll({
      where: { koordinatorId: req.user.id },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });

    // Tambahkan informasi target berdasarkan jenis latihan
    const katalogWithTargets = katalog.map(item => {
      const data = item.toJSON();
      const jenisLatihan = data.jenisLatihan;
      return {
        ...data,
        targetSkor: JENIS_LATIHAN[jenisLatihan].targetMinimal,
        deskripsiTarget: JENIS_LATIHAN[jenisLatihan].deskripsiTarget
      };
    });

    res.json(katalogWithTargets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKatalogById = async (req, res) => {
  const { id } = req.params;
  try {
    const katalog = await db.KatalogLatihan.findOne({
      where: { 
        id,
        koordinatorId: req.user.id 
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });

    if (!katalog) {
      return res.status(404).json({ message: 'Katalog latihan tidak ditemukan' });
    }

    // Add target information
    const response = {
      ...katalog.toJSON(),
      targetSkor: JENIS_LATIHAN[katalog.jenisLatihan].targetMinimal,
      deskripsiTarget: JENIS_LATIHAN[katalog.jenisLatihan].deskripsiTarget
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambah katalog latihan baru
export const addKatalogLatihan = async (req, res) => {
  const {
    nama,
    deskripsi,
    jenisLatihan,
    tingkatKesulitan,
    durasi,
    peralatan,
    manfaat,
    cabangOlahraga
  } = req.body;

  try {
    // Validasi input
    if (!nama || !jenisLatihan || !tingkatKesulitan || !durasi || !cabangOlahraga) {
      return res.status(400).json({
        message: 'Nama, jenis latihan, tingkat kesulitan, durasi, dan cabang olahraga harus diisi'
      });
    }

    // Validasi jenis latihan
    if (!JENIS_LATIHAN[jenisLatihan]) {
      return res.status(400).json({
        message: 'Jenis latihan tidak valid'
      });
    }

    const katalog = await db.KatalogLatihan.create({
      nama,
      deskripsi,
      jenisLatihan,
      tingkatKesulitan,
      durasi,
      peralatan,
      manfaat,
      cabangOlahraga,
      koordinatorId: req.user.id,
      targetSkor: JENIS_LATIHAN[jenisLatihan].targetMinimal
    });

    await db.ActivityLog.create({
      action: `Menambahkan katalog latihan baru: ${nama} (${jenisLatihan})`,
      koordinatorId: req.user.id
    });

    // Return dengan informasi target
    const response = {
      ...katalog.toJSON(),
      deskripsiTarget: JENIS_LATIHAN[jenisLatihan].deskripsiTarget
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mengupdate katalog latihan
export const updateKatalogLatihan = async (req, res) => {
  const { id } = req.params;
  try {
    const katalog = await db.KatalogLatihan.findOne({
      where: { id, koordinatorId: req.user.id },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });

    if (!katalog) {
      return res.status(404).json({ message: 'Katalog latihan tidak ditemukan' });
    }

    await katalog.update(req.body);

    await db.ActivityLog.create({
      action: `Mengupdate katalog latihan: ${katalog.nama}`,
      koordinatorId: req.user.id,
    });

    res.json(katalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus katalog latihan
export const deleteKatalogLatihan = async (req, res) => {
  const { id } = req.params;
  try {
    const katalog = await db.KatalogLatihan.findOne({
      where: { id, koordinatorId: req.user.id }
    });

    if (!katalog) {
      return res.status(404).json({ message: 'Katalog latihan tidak ditemukan' });
    }

    await katalog.destroy(); // This will also delete associated OpsiLatihan due to CASCADE

    await db.ActivityLog.create({
      action: `Menghapus katalog latihan: ${katalog.nama}`,
      koordinatorId: req.user.id,
    });

    res.json({ message: 'Katalog latihan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan katalog latihan berdasarkan jenis
export const getKatalogByJenis = async (req, res) => {
  const { jenisLatihan } = req.params;
  try {
    const katalog = await db.KatalogLatihan.findAll({
      where: { 
        jenisLatihan,
        koordinatorId: req.user.id,
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });
    res.json(katalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan katalog latihan berdasarkan cabang olahraga
export const getKatalogByCabangOlahraga = async (req, res) => {
  const { cabangOlahraga } = req.params;
  try {
    const katalog = await db.KatalogLatihan.findAll({
      where: { 
        cabangOlahraga,
        koordinatorId: req.user.id,
      },
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }]
    });
    res.json(katalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mendapatkan katalog latihan dengan filter
export const getKatalogByFilter = async (req, res) => {
  const { jenisLatihan, tingkatKesulitan, cabangOlahraga } = req.query;
  try {
    const whereClause = { koordinatorId: req.user.id };
    
    if (jenisLatihan) whereClause.jenisLatihan = jenisLatihan;
    if (tingkatKesulitan) whereClause.tingkatKesulitan = tingkatKesulitan;
    if (cabangOlahraga) whereClause.cabangOlahraga = cabangOlahraga;

    const katalog = await db.KatalogLatihan.findAll({
      where: whereClause,
      include: [{
        model: db.OpsiLatihan,
        as: 'opsiLatihan'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(katalog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};