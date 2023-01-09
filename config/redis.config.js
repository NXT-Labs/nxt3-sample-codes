const Redis = require("ioredis");

exports.redis = new Redis(process.env.REDIS_HOST, process.env.REDIS_PORT);
