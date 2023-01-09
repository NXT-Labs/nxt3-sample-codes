const Joi = require("celebrate").Joi;

module.exports = {
  getLeaderboard: {
    query: { filter: Joi.string().trim().valid("monthly", "weekly") },
  },
};
