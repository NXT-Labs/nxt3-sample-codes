const cron = require("node-cron");
const Redis = require("ioredis");
const redis = new Redis({});
const userService = require("../../services/User/User");
const { logger } = require("../../logger");
const { emptyRedisLeaderboard, updateRedisLeaderboard } = require("./helpers");
const {
  startedCronjob,
  cronJobSuccess,
  cronJobFailed,
  genericInfoWithCtx,
} = require("../../common/logMessages");
const { DAILY, MONTHLY, WEEKLY } = require("../../constants/CronSchedules");

module.exports = () => {
  cron.schedule(DAILY, setLeaderboard);

  cron.schedule(DAILY, set30DayLeaderboard);

  cron.schedule(DAILY, set7DayLeaderboard);

  cron.schedule(WEEKLY, setWeeklyLeaderboardHistory);

  cron.schedule(MONTHLY, setLeaderboardHistory);
};

async function setLeaderboard() {
  let ctx = { players: [] };
  let type = "Leaderboard last 24 hours";
  let setName = "leaderboards";
  startedCronjob(logger, type);
  try {
    // Get existing leaderboard
    let leaderboards = await redis.zrevrange(setName, 0, 29);

    // Remove leaderboard keys if already exist
    await emptyRedisLeaderboard(logger, leaderboards, setName, type, redis);

    const players = await userService.getAllTimeTopPlayers();

    const updateRedis = await updateRedisLeaderboard(
      players,
      logger,
      ctx,
      setName,
      type,
      redis
    );

    if (!updateRedis) {
      return;
    }

    const message = "sucessfully set leaderboard results in redis.";
    cronJobSuccess(logger, type, message, ctx);
    return;
  } catch (error) {
    cronJobFailed(logger, type, error, ctx);
  }
}

async function set30DayLeaderboard() {
  let ctx = { players: [] };
  let type = "Leaderboard last 30 days";
  let setName = "leaderboardsMonthly";
  startedCronjob(logger, type);
  try {
    // Get existing leaderboard
    let leaderboards = await redis.zrevrange(setName, 0, 29);

    // Remove leaderboard keys if already exist
    await emptyRedisLeaderboard(logger, leaderboards, setName, type, redis);

    const players = await userService.getMonthlyTopPlayers();

    const updateRedis = await updateRedisLeaderboard(
      players,
      logger,
      ctx,
      setName,
      type,
      redis
    );

    if (!updateRedis) {
      return;
    }

    const message = "sucessfully set leaderboard results in redis.";
    cronJobSuccess(logger, type, message, ctx);
    return;
  } catch (error) {
    cronJobFailed(logger, type, error, ctx);
  }
}

async function set7DayLeaderboard() {
  let ctx = { players: [] };
  let type = "Leaderboard last 7 days";
  let setName = "leaderboardsWeekly";
  startedCronjob(logger, type);
  try {
    // Get existing leaderboard
    let leaderboards = await redis.zrevrange("leaderboardsWeekly", 0, 29);

    // Remove leaderboard keys if already exist
    await emptyRedisLeaderboard(logger, leaderboards, setName, type, redis);

    const players = await userService.getWeeklyTopPlayers();

    const updateRedis = await updateRedisLeaderboard(
      players,
      logger,
      ctx,
      setName,
      type,
      redis
    );

    if (!updateRedis) {
      return;
    }

    const message = "sucessfully set leaderboard results in redis.";
    cronJobSuccess(logger, type, message, ctx);
    return;
  } catch (error) {
    cronJobFailed(logger, type, error, ctx);
  }
}

async function setLeaderboardHistory() {
  let ctx = { players: [], month: "", year: "", newEntry: [] };
  let type = "Leaderboard monthly history archive";
  startedCronjob(logger, type);
  try {
    const [players, month, year] = await userService.getThisMonthsTopPlayers();
    ctx.month = month;
    ctx.year = year;
    ctx.players = players;

    if (!players.length) {
      const message = `cronjob (${type}): no players records found, could not update database.`;
      genericInfoWithCtx(logger, message, ctx);
      return;
    }

    const newEntry = players.map((player, index) => {
      return { userId: player.user_id, ranking: index + 1, month: month, year: year };
    });

    ctx.newEntry = newEntry;

    await userService.createNewMonthlyLeaderboardEntry(newEntry);
    const message = "successfully archived monthly leaderboard history";
    cronJobSuccess(logger, type, message, ctx);
    return;
  } catch (error) {
    cronJobFailed(logger, type, error, ctx);
  }
}

async function setWeeklyLeaderboardHistory() {
  let ctx = { players: [], startOfWeek: "", endOfWeek: "", newEntry: [] };
  let type = "Leaderboard weekly history archive";
  startedCronjob(logger, type);
  try {
    const [players, startOfWeek, endOfWeek] = await userService.getThisWeeksTopPlayers();
    ctx.startOfWeek = startOfWeek;
    ctx.endOfWeek = endOfWeek;
    ctx.players = players;

    if (!players.length) {
      const message = `cronjob (${type}): no players records found, could not update database.`;
      genericInfoWithCtx(logger, message, ctx);
      return;
    }

    const newEntry = players.map((player, index) => {
      return {
        userId: player.user_id,
        ranking: index + 1,
        startOfWeek: startOfWeek,
        endOfWeek: endOfWeek,
      };
    });

    ctx.newEntry = newEntry;

    await userService.createNewWeeklyLeaderboardEntry(newEntry);

    const message = "successfully archived weekly leaderboard history";
    cronJobSuccess(logger, type, message, ctx);
    return;
  } catch (error) {
    cronJobFailed(logger, type, error, ctx);
  }
}
