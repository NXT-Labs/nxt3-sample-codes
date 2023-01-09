const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Game = sequelize.define(
  "games",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    archive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    gameLogo: {
      type: DataTypes.TEXT,
      defaultValue: '',
      allowNull: true,
    },
  },
  { underscored: true }
);

module.exports = Game;
