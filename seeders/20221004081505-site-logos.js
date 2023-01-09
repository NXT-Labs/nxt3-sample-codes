"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "site_logos",
      [
        {
          url: "https://cyber-battles-dev.s3.amazonaws.com/logos/94ec551b-9145-4dd9-b5e3-2df85246cc47.png",
          page: "home",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete("site_logos", { id: { [Op.in]: [1] } }, {});
  },
};
