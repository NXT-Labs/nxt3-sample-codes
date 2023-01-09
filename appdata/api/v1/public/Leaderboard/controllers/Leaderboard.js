const responses = require("../../../../../../constants/Responses");
const leaderboardService = require("../../../../../../services/Leaderboard/Leaderboard");
const {
  serverErrorResponse,
  successResponse,
  notFoundResponse,
} = require("../../../../../../services/Response/Response");
const moment = require("moment");
const {
  getStartOfWeekFromDate,
  getEndOfWeekFromDate,
} = require("../../../../../../utils/date.utils");
const { DB_DATE_FORMAT } = require("../../../../../../constants/DateFormats");

const getLeaderboard = async (req, res, next) => {
  try {
    const { filter } = req.query;

    const leaderboard = await leaderboardService.getLeaderboard(filter);

    if (!Array.isArray(leaderboard)) {
      serverErrorResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { leaderboard: leaderboard };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getPlayersOfTheWeek = async (req, res, next) => {
  try {
    const today = moment().format(DB_DATE_FORMAT);
    const startOfWeek = getStartOfWeekFromDate(today);
    const endOfWeek = getEndOfWeekFromDate(today);

    const players = await leaderboardService.getPlayersOfTheWeek(startOfWeek, endOfWeek);

    if (!players || players.error) {
      notFoundResponse(res);
      return;
    }

    const responseData = { playersOfTheWeek: players };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeaderboard, getPlayersOfTheWeek };
