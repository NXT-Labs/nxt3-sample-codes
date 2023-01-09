const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UserProfile = sequelize.define(
  "user_profiles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    totalEarnings: {
      type: DataTypes.STRING,
    },
    availableCredits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    paypalEmail: {
      type: DataTypes.STRING,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    twitter: {
      type: DataTypes.STRING,
    },
    facebook: {
      type: DataTypes.STRING,
    },
    twitch: {
      type: DataTypes.STRING,
    },
    youtube: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    psnId: {
      type: DataTypes.STRING,
    },
    xboxLiveId: {
      type: DataTypes.STRING,
    },
    epicGamesId: {
      type: DataTypes.STRING,
    },
    pubgId: {
      type: DataTypes.STRING,
    },
    steamId: {
      type: DataTypes.STRING,
    },
    battleNetId: {
      type: DataTypes.STRING,
    },
    switchId: {
      type: DataTypes.STRING,
    },
    originId: {
      type: DataTypes.STRING,
    },
    totalEarnings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    availableCredits: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    cryptoWalletAddress: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
  }
);

module.exports = UserProfile;
