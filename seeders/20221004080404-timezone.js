"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "timezones",
      [
        {
          timezone: "Asia/Karachi",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          timezone: "America/New_York",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          timezone: "America/Los_Angeles",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          timezone: "Asia/Tokyo",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(
      "timezones",
      { id: { [Op.in]: [1, 2, 3, 4] } },
      {}
    );
  },
};
