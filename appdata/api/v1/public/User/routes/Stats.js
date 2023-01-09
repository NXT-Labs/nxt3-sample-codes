const userGameStatsRouter = require("express").Router();
const statController = require("../controllers/Stats");
const celebrate = require("celebrate").celebrate;

const userValidator = require("../validations");

userGameStatsRouter.get(
  "/userStats/:userId",
  celebrate(userValidator.userStats),
  statController.getUserStats,
);

userGameStatsRouter.get(
  "/allGameStats/:userId",
  celebrate(userValidator.userStats),
  statController.getAllGameStats,
);

module.exports = userGameStatsRouter;
