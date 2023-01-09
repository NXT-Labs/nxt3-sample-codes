const { redis } = require("../../config/redis.config");
const User = require("../../models/User");
const UserProfile = require("../../models/UserProfile");
const WeeklyLeaderboardHistory = require("../../models/WeeklyLeaderboardHistory");
const { serverErrorResponse, successResponse } = require("../Response/Response");

const getLeaderboard = async (filter) => {
  try {
    let rankedUsers = null;

    if (filter == "monthly") {
      rankedUsers = await redis.zrevrange("leaderboardsMonthly", 0, 29);
    } else if (filter == "weekly") {
      rankedUsers = await redis.zrevrange("leaderboardsWeekly", 0, 29);
    } else {
      // All time results
      rankedUsers = await redis.zrevrange("leaderboards", 0, 29);
    }

    if (!Array.isArray(rankedUsers)) {
      return false;
    }

    let leaderboard = await User.findAll({
      where: {
        id: [...rankedUsers],
      },
      include: { model: UserProfile },
      attributes: { exclude: ["password"] },
    });

    leaderboard = JSON.parse(JSON.stringify(leaderboard));

    const itemPositions = {};
    for (const [index, id] of rankedUsers.entries()) {
      itemPositions[id] = index;
    }

    leaderboard.sort((a, b) => itemPositions[a.id] - itemPositions[b.id]);

    return leaderboard;
  } catch (error) {
    console.error(error);
  }
};

const getPlayersOfTheWeek = async (startOfWeek, endOfWeek) => {
  try {
    const players = await WeeklyLeaderboardHistory.findAll({
      where: {
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek,
        ranking: [1, 2, 3],
      },
      include: [
        {
          model: User,
          include: { model: UserProfile },
          attributes: { exclude: ["password"] },
        },
      ],
      attributes: { exclude: ["userId"] },
      order: [["ranking", "ASC"]],
    });

    return players;
  } catch (error) {
    console.error(error);
    return {
      error: error,
    };
  }
};

module.exports = { getLeaderboard, getPlayersOfTheWeek };
