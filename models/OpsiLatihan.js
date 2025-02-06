// models/OpsiLatihan.js
export default (sequelize, DataTypes) => {
  const OpsiLatihan = sequelize.define("OpsiLatihan", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durasi: {
      type: DataTypes.INTEGER, // dalam menit
      allowNull: false,
    },
    repetisi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instruksi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    katalogLatihanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "KatalogLatihans",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  // Define association

  return OpsiLatihan;
};
