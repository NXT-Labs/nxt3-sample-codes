const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ChatMessage = sequelize.define(
  "chat_messages",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    chatMemberId: {
      type: DataTypes.INTEGER,
    },
    chatRoomId: {
      type: DataTypes.INTEGER,
    },
    message: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: "text",
    },
    disputeRoomId: {
      type: DataTypes.INTEGER,
    },
    disputeChatMemberId: {
      type: DataTypes.INTEGER,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  { underscored: true }
);

module.exports = ChatMessage;
