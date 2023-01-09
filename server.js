require("dotenv").config();
require("./app");

const { app } = require("./app");
const sequelize = require("./config/db.config");

require("./models/Relations");
const models = require("./models/modelNames");

require("./passport/JwtStrategy");
require("./passport/LocalStrategy");
require("./utils/auth.utils");
require("./subscribers/email");
require("./subscribers/notification");

require("./socketIo/matchChat/listeners");
require("./socketIo/matchChat/emitters");
require("./socketIo/disputeChat/listeners");
require("./socketIo/disputeChat/emitters");

const { verifyUser } = require("./utils/auth.utils");

const publicRoutes = require("./appdata/base-routes/Routes.public");
const privateRoutes = require("./appdata/base-routes/Routes.private");
const { handleErrors } = require("./utils/errorHandling.utils");
const { logger, morganMiddleware } = require("./logger");

app.use(morganMiddleware);

app.model = (model) => models[model];

// App routes:
app.use(publicRoutes);
app.use(verifyUser, privateRoutes);
app.use(handleErrors);

const initDB = async () => {
  // Check DB connection
  try {
    await sequelize.authenticate();

    //Uncomment for resetting the DB in dev environment
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error(`Unable to connect to database: ${error}`);
  }
};

initDB();
