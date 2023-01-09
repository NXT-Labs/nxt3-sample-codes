const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const GameProfileConfigOptions = sequelize.define(
  "game_profile_config_options",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    option: {
      type: DataTypes.STRING,
    },
    gameProfileConfigId: {
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = GameProfileConfigOptions;
