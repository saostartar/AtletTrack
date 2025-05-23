// models/Pencapaian.js
export default (sequelize, DataTypes) => {
  const Pencapaian = sequelize.define("Pencapaian", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tanggal: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Pencapaian;
};
