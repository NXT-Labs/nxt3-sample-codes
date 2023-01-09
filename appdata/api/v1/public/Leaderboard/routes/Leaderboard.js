const leaderboardRouter = require("express").Router();
const leaderboardController = require("../controllers/Leaderboard");
const celebrate = require("celebrate").celebrate; // Used to validate request body data with Joi

// Validations
const leaderboardValidator = require("../validations");

leaderboardRouter.get(
  "/get",
  celebrate(leaderboardValidator.getLeaderboard),
  leaderboardController.getLeaderboard
);
leaderboardRouter.get("/playersOfTheWeek", leaderboardController.getPlayersOfTheWeek);

module.exports = leaderboardRouter;
