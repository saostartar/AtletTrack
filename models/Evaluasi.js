// models/Evaluasi.js
export default (sequelize, DataTypes) => {
  const Evaluasi = sequelize.define("Evaluasi", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latihanAtletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "LatihanAtlets",
        key: "id",
      },
    },
    atletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    koordinatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenisLatihan: {
      type: DataTypes.ENUM(
        "KETAHANAN",
        "KEKUATAN",
        "KECEPATAN",
        "KELINCAHAN",
        "KOORDINASI"
      ),
      allowNull: false,
    },
    skor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    targetPencapaian: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    aspekPenilaian: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Kriteria penilaian berdasarkan jenis latihan",
    },
    komentar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tanggalEvaluasi: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    totalRepetisiTercapai: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Jumlah repetisi yang berhasil diselesaikan",
    },
    totalRepetisiTarget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Jumlah repetisi yang ditargetkan",
    },
    persentaseKetercapaian: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "Persentase ketercapaian dari target repetisi",
    },
  });

  return Evaluasi;
};
