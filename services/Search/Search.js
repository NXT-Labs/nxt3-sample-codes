// const Shop = require("../../models/Shop");
// const ShopItem = require("../../models/ShopItem");

const { Op } = require("sequelize");
const Game = require("../../models/Game");
const Match = require("../../models/Match");
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");

const searchByUser = async (keyword) => {
  const userItems = await User.findAndCountAll({
    where: {
      userName: {
        [Op.iLike]: "%" + keyword + "%",
      },
    },
    include: {
      model: UserProfile,
    },
    order: [["id", "desc"]],
  });
  return userItems;
};

const searchByGames = async (keyword) => {
  const shopItems = await Game.findAndCountAll({
    where: {
      title: {
        [Op.iLike]: "%" + keyword + "%",
      },
    },
    order: [["id", "desc"]],
  });
  return shopItems;
};

module.exports = {
  searchByUser,
  searchByGames,
};
