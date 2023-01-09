const responses = require("../../../../../../constants/Responses");
const getGameService = require("../../../../../../services/Game/Get");
const gameConfigService = require("../../../../../../services/Game/Config");
const {
  serverErrorResponse,
  successResponse,
  notFoundResponse,
} = require("../../../../../../services/Response/Response");

const getGamePlatforms = async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const gamePlatforms = await getGameService.getGamePlatforms(gameId);

    if (!gamePlatforms) {
      notFoundResponse(res);
      return;
    }

    const responseData = { platforms: gamePlatforms };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getGames = async (req, res, next) => {
  try {
    const { offset, limit, game } = req.query;

    const games = await getGameService.getGames(offset, limit, game || "");
    const gamesCount = await getGameService.getGamesCount();

    const responseData = {
      games: games.games,
      gamesCount: games.gamesCount,
      totalPageCount: Math.ceil(gamesCount / limit),
    };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getGameById = async (req, res, next) => {
  try {
    const { gameId } = req.params;

    const game = await getGameService.getGameById(gameId);

    const responseData = { game: game };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getGameProfileConfigs = async (req, res, next) => {
  try {
    const { gameProfileId } = req.params;
    const gameProfileConfigs = await getGameService.getGameProfileConfigs(gameProfileId);

    if (!gameProfileConfigs) {
      notFoundResponse(res, responses.CONFIGS_NOT_FOUND);
      return;
    }

    const bestOfValues = await gameConfigService.getBestOfValues();
    const matchStartTimes = await gameConfigService.getMatchStartTimes();
    const skillLevels = await gameConfigService.getSkillLevels();
    const gamePlatforms = await gameConfigService.getGamePlatforms(gameProfileId);

    const responseData = {
      configs: gameProfileConfigs,
      defaultConfigs: {
        bestOf: bestOfValues,
        startTimes: matchStartTimes,
        skillLevels: skillLevels,
        gamePlatforms: gamePlatforms,
      },
    };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getCashMatchGames = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;

    const cashMatchGames = await getGameService.getCashMatchGames(offset, limit);
    const cashMatchGamesCount = await getGameService.getCashMatchGamesCount();

    if (!cashMatchGames) {
      notFoundResponse(res);
      return;
    }

    const responseData = {
      games: cashMatchGames,
      totalPageCount: Math.ceil(cashMatchGamesCount / limit),
    };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getFreeMatchGames = async (req, res, next) => {
  try {
    const { offset, limit } = req.query;

    const freeMatchGames = await getGameService.getFreeMatchGames(offset, limit);

    if (!freeMatchGames) {
      notFoundResponse(res);
      return;
    }

    const countOfGames = freeMatchGames.allFreeGames.length;

    const responseData = {
      freeMatchGames: freeMatchGames.freeMatchGames,
      countOfGames: countOfGames,
      totalPageCount: Math.ceil(countOfGames / limit),
    };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGamePlatforms,
  getGames,
  getGameById,
  getGameProfileConfigs,
  getCashMatchGames,
  getFreeMatchGames,
};
