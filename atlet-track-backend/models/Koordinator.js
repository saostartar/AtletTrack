export default (sequelize, DataTypes) => {
    const Koordinator = sequelize.define('Koordinator', {
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
      // Tambahkan field lain jika diperlukan
    });
  
    return Koordinator;
  };
  