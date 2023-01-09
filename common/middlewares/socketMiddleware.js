const { redis } = require("../../config/redis.config");
const { verifySocketUser } = require("../../utils/auth.utils");

const wrapMiddlewareForSocketIo = (middleware, socket, next) => {
  const runMIddleWare = (socket, next) => {
    middleware(socket.request, {}, next);
  };

  runMIddleWare(socket, next);
};

const authenticateUser = (socket, next) => {
  wrapMiddlewareForSocketIo(verifySocketUser, socket, next);
};

const addAuthenticatedUserToRedis = async (socket, next) => {
  if (socket.request.user) {
    socket.request.user.password = undefined;
    const user = socket.request.user;
    await redis.lpush(`socket-user-${user.id}`, socket.id);
    next();
  } else {
    next(new Error("unauthorized"));
  }
};

module.exports = {
  addAuthenticatedUserToRedis,
  authenticateUser,
};
