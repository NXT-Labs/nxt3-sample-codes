const getGamesRouter = require("express").Router();
const getGameController = require("../controllers/Get");
const celebrate = require("celebrate").celebrate; // Used to validate request body data with Joi

// Validators:
const gameValidator = require("../validations");

getGamesRouter.get(
  "/gamePlatforms/:gameId",
  celebrate(gameValidator.gamePlatformValidator),
  getGameController.getGamePlatforms
);

getGamesRouter.get("/all", getGameController.getGames);
getGamesRouter.get(
  "/gameProfileConfigs/:gameProfileId",
  getGameController.getGameProfileConfigs
);
getGamesRouter.get(
  "/cashMatchGames",
  celebrate(gameValidator.getCashMatches),
  getGameController.getCashMatchGames
);
getGamesRouter.get(
  "/freeMatchGames",
  celebrate(gameValidator.getCashMatches),
  getGameController.getFreeMatchGames
);
getGamesRouter.get("/:gameId", getGameController.getGameById);

module.exports = getGamesRouter;
