// models/Pesan.js
export default (sequelize, DataTypes) => {
  const Pesan = sequelize.define('Pesan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('sent', 'read'),
      defaultValue: 'sent',
      allowNull: false,
    },
    senderRole: {
      type: DataTypes.ENUM('atlet', 'koordinator'),
      allowNull: false,
    },
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Conversations',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    atletId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Atlets',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    koordinatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Koordinators',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  });

  return Pesan;
};