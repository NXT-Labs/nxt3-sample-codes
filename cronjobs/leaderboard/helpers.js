const updateRedisLeaderboard = async (players, logger, ctx, setName, type, redis) => {
  if (!players.length) {
    logger
      .child({ context: ctx })
      .info(
        `cronjob (${type}): no player records retrieved from database, redis leaderboard not updated.`
      );

    return false;
  }

  players.forEach(async (player) => {
    ctx.players.push({ player_id: player.user_id, player_wins: player.wins });
    await redis.zadd(setName, player.wins, player.user_id);
  });

  return true;
};

const emptyRedisLeaderboard = async (logger, leaderboard, setName, type, redis) => {
  if (leaderboard.length) {
    await redis.zrem(setName, ...leaderboard);
    logger.info(
      `cronjob (${type}): sucessfully removed old leaderboard results from redis.`
    );
  }
};

module.exports = {
  updateRedisLeaderboard,
  emptyRedisLeaderboard,
};
