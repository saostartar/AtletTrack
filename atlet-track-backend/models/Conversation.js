// models/Conversation.js
export default (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    koordinatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Koordinators',
        key: 'id'
      }
    },
    atletId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Atlets',
        key: 'id'
      }
    },
    lastMessageAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Conversation;
};