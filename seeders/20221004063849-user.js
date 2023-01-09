"use strict";

const bcrypt = require("bcryptjs");

const hashPassword = async () => {
  return await bcrypt.hash("nxt1234", parseInt(process.env.SALT_ROUNDS, 10));
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_name: "faizan",
          email: "faizan+1@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "hunbal",
          email: "faizan+3@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "faizan1",
          email: "faizan+31@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "faizan3",
          email: "faizan+312@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "faizan4",
          email: "faizan+341@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "faizan5",
          email: "faizan+351@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_name: "faizan6",
          email: "faizan+361@nxtdevs.com",
          timezone_id: 1,
          date_of_birth: "2022-09-14 05:00:00+05",
          password: await hashPassword(),
          is_active: true,
          email_verified: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );

    await queryInterface.bulkInsert(
      "user_profiles",
      [
        {
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          phone: "1234455",
          created_at: new Date(),
          updated_at: new Date(),
          available_credits: 1000,
        },
        {
          user_id: 3,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
          available_credits: 1000,
        },
        {
          user_id: 4,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          phone: "1233455",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
    //Create admin role
    await queryInterface.bulkInsert(
      "user_roles",
      [
        {
          user_id: 1,
          role_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("user_roles", { user_id: 1, role_id: 1 }, {});
    await queryInterface.bulkDelete("user_profiles", { id: { [Op.in]: [1, 2, 3] } }, {});
    return await queryInterface.bulkDelete("users", { id: { [Op.in]: [1, 2, 3] } }, {});
  },
};
