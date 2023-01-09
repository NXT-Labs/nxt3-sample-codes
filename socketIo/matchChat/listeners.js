const { io } = require("../../app.js");
const { redis } = require("../../config/redis.config.js");
const events = require("../../constants/MatchChatEvents");
const {
  addAuthenticatedUserToRedis,
  authenticateUser,
} = require("../../common/middlewares/socketMiddleware.js");
const { openChatOnConnection } = require("./emitters.js");
const { logger } = require("../../logger/index.js");

//Verify user and get user details
io.use(authenticateUser);

// Store user with socket detail in redis if user authenticated
io.use(addAuthenticatedUserToRedis);

io.on(events.CONNECTION, async (socket) => {
  logger.debug("Socket client connected: " + socket.id);

  openChatOnConnection(socket);

  socket.on(events.LOGOUT, async () => {
    socket.disconnect();
  });

  socket.on(events.DISCONNECT, async () => {
    logger.debug("Socket client disconnected: " + socket.id);

    // get a list of all the rooms that the socket is in
    const rooms = Object.keys(socket.rooms);

    // leave each room
    rooms.forEach((room) => {
      socket.leave(room);
    });

    // Remove socket record from redis store
    await redis.lrem(`socket-user-${socket.request.user.id}`, 0, socket.id);
  });
});
