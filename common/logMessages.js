module.exports = {
  startedCronjob: (logger, type) => logger.info(`cronjob (${type}): started running.`),
  cronJobFailed: (logger, type, error, ctx) =>
    logger
      .child({ context: ctx })
      .error(`cronjob (${type}): job failed, details: ${error}`),
  cronJobSuccess: (logger, type, message, ctx) =>
    logger.child({ context: ctx }).info(`cronjob (${type}): ${message}`),
  genericInfoWithCtx: (logger, message, ctx) =>
    logger.child({ context: ctx }).info(message),
  logError: (logger, message, ctx) => {
    if (ctx) {
      logger.child({ context: ctx }).error(message);
    } else {
      logger.error(message);
    }
  },
  logInfo: (logger, message, ctx) => {
    if (ctx) {
      logger.child({ context: ctx }).info(message);
    } else {
      logger.info(message);
    }
  },
};
