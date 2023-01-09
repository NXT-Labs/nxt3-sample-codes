"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "games",
      [
        {
          title: "Call of Duty",
          thumbnail:
            "https://cyber-battles-dev.s3.amazonaws.com/thumbnails/games/4d9cc5ea-6281-4010-9441-600653e8b42a.jpg",
          archive: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete("games", { id: { [Op.in]: [1] } }, {});
  },
};
