export default (sequelize, DataTypes) => {
  const KatalogLatihan = sequelize.define("KatalogLatihan", {
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
    },
    jenisLatihan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tingkatKesulitan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    durasi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peralatan: {
      type: DataTypes.TEXT,
    },
    manfaat: {
      type: DataTypes.TEXT,
    },
    cabangOlahraga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    koordinatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Koordinators",
        key: "id",
      },
    },
    targetSkor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
      comment: "Target skor yang harus dicapai atlet",
    },
  });

  return KatalogLatihan;
};
