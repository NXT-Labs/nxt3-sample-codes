const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { redis } = require("./config/redis.config");
const { createServer } = require("http");
const { Server } = require("socket.io");
const leaderboardJobs = require("./cronjobs/leaderboard");
const emailJobs = require("./cronjobs/email");
const matchJobs = require("./cronjobs/match");
const { logger } = require("./logger");
const app = express();
const httpServer = createServer(app);

var whitelistedDomains = [
  "https://dev.cyberbattles.gg",
  "http://dev.cyberbattes.gg",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3006",
  "https://a240-2400-adc1-13f-3a00-2495-8532-f688-c8c0.ap.ngrok.io"
];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);

    if (whitelistedDomains.indexOf(origin) === -1) {
      var msg = `${origin} does not have access to this server.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
};

const socketOptions = {
  cors: corsOptions,
};

const io = new Server(httpServer, socketOptions);

// Start server
httpServer.listen(process.env.PORT || 8000, () => {
  logger.info("Server started at port " + process.env.PORT || 8000);

  //remove all stored socket ids from redis cache
  const stream = redis.scanStream({
    match: "socket-user-*",
  });

  stream.on("data", function (keys) {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      const pipeline = redis.pipeline();
      keys.forEach(function (key) {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });
  stream.on("end", function () {
    logger.info("Cleared stale socket ids from redis cache");
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

//implementing cors
app.use(cors(corsOptions));

app.use(express.json());
app.use(passport.initialize());

leaderboardJobs();
emailJobs();
matchJobs();

module.exports = { app, io };
