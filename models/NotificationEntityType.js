const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const NotificationEntityType = sequelize.define(
  "notification_entity_types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { underscored: true }
);

module.exports = NotificationEntityType;
