const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const NotificationDetail = sequelize.define(
  "notification_details",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notificationEntityTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = NotificationDetail;
