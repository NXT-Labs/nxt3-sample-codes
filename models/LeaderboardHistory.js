const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const LeaderboardHistory = sequelize.define(
  "leaderboard_history",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    ranking: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    month: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = LeaderboardHistory;
