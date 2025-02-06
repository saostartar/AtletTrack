export default (sequelize, DataTypes) => {
  const Atlet = sequelize.define("Atlet", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
  });

  return Atlet;
};
