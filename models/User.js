const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const bcrypt = require("bcryptjs");

// Generate and save password hash
const hashPassword = async (user) => {
  try {
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
  } catch (error) {
    console.error(error);
  }
};

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    timezoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      field: "date_of_birth",
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(60),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    resend_email_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  }
);

module.exports = User;
