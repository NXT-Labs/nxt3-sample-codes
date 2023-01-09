const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ChatRoom = sequelize.define(
  "chat_rooms",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    matchId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { underscored: true }
);

module.exports = ChatRoom;
