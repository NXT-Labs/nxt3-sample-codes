"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("matches", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      entryFee: {
        field: "entry_fee",
        type: Sequelize.INTEGER,
      },
      available: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      numberOfPlayers: {
        field: "number_of_players",
        type: Sequelize.INTEGER,
        defaultValue: 2,
        validate: {
          min: 2,
          max: 2,
        },
      },
      team_match: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "not_started",
        validate: {
          isIn: [["not_started", "waiting_to_start", "in_progress", "completed"]],
        },
      },
      game_profile_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_by_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      platform_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      skill_level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      best_of_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      match_start_time_id: {
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
    await queryInterface.dropTable("match");
  },
};
