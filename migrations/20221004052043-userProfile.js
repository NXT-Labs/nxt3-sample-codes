"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("user_profiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      avatar: { type: Sequelize.STRING },
      phone: {
        type: Sequelize.STRING,
      },
      twitter: {
        type: Sequelize.STRING,
      },
      facebook: {
        type: Sequelize.STRING,
      },
      twitch: {
        type: Sequelize.STRING,
      },
      youtube: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      psnId: {
        field: "psn_id",
        type: Sequelize.STRING,
      },
      xboxLiveId: {
        field: "xbox_live_id",
        type: Sequelize.STRING,
      },
      epicGamesId: {
        field: "epic_games_id",
        type: Sequelize.STRING,
      },
      pubgId: {
        field: "pubg_id",
        type: Sequelize.STRING,
      },
      steamId: {
        field: "steam_id",
        type: Sequelize.STRING,
      },
      battleNetId: {
        field: "battle_net_id",
        type: Sequelize.STRING,
      },
      switchId: {
        field: "switch_id",
        type: Sequelize.STRING,
      },
      originId: {
        field: "origin_id",
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_profiles");
  },
};
