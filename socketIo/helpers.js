const getARoom = (chatRoomId) => `private-match-chat-${chatRoomId}`;

const getDisputeRoom = (disputeRoomId) => `private-dispute-chat-${disputeRoomId}`;

const joinSocketToRoom = (room, socket) => socket.join(room);

const getAdminSockets = async (redis) => await redis.lrange(`socket-user-0`, 0, -1);

const getUserSockets = async (redis, userId) =>
  await redis.lrange(`socket-user-${userId}`, 0, -1);

module.exports = {
  getARoom,
  joinSocketToRoom,
  getAdminSockets,
  getDisputeRoom,
  getUserSockets,
};
