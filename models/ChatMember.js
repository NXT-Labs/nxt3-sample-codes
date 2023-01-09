const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ChatMember = sequelize.define(
  "chat_members",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    chatRoomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = ChatMember;
