const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const EmailVerification = sequelize.define(
  "email_verifications",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    forgotPasswordToken: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  { underscored: true }
);

module.exports = EmailVerification;
