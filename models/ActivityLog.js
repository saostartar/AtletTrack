export default (sequelize, DataTypes) => {
    const ActivityLog = sequelize.define('ActivityLog', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      // Foreign keys handled in associations
    });
  
    return ActivityLog;
  };
  