'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('shop_items', [{
      name: 'shop item 1',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg ',
      price:10,
      credits:10,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'shop item 2',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg',
      price:20,
      credits:20,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'shop item 3',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg',
      price:100,
      credits:100,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'shop item 4',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg',
      price:500,
      credits:500,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'shop item 5',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg',
      price:20,
      credits:20,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'shop item 6',
      thumbnail: 'https://cyber-battles-dev.s3.amazonaws.com/thumbnails/shops/66c6b3d0-3fd7-401c-899a-62e23cbc8ac3.jpg',
      price:20,
      credits:20,
      type:"credit",
      created_at: new Date(),
      updated_at: new Date(),
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
