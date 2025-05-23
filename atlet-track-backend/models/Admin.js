export default (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
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
  
    return Admin;
  };
  