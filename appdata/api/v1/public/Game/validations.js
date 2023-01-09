const Joi = require("celebrate").Joi;

module.exports = {
  gamePlatformValidator: {
    params: {
      gameId: Joi.string().trim().required(),
    },
  },
  getCashMatches: {
    query: {
      offset: Joi.string().optional(),
      limit: Joi.string().optional(),
    },
  },
};
