const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const MatchStartTime = sequelize.define(
  "match_start_times",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    label: {
      type: DataTypes.STRING,
    },
    startTime: {
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = MatchStartTime;
