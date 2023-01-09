const { io } = require("../../app.js");
const { redis } = require("../../config/redis.config.js");
const events = require("../../constants/MatchChatEvents");
const matchStatus = require("../../constants/MatchStatus.js");
const { logger } = require("../../logger/index.js");
const { getUserMatch, getMatchSubmission } = require("../../services/Match/Match.js");
const { getARoom } = require("../helpers");

const openChat = async (members, chatRoomId, matchId) => {
  let ctx = {};
  try {
    const room = getARoom(chatRoomId);
    ctx.room = room;

    // Get all socket ids of players from redis store
    const player1SocketIds = await redis.lrange(`socket-user-${members[0].id}`, 0, -1);
    const player2SocketIds = await redis.lrange(`socket-user-${members[1].id}`, 0, -1);

    ctx.player1SocketIds = player1SocketIds;
    ctx.player2SocketIds = player2SocketIds;

    // if player socket ids exist add players to room
    if (Array.isArray(player1SocketIds) && player1SocketIds.length) {
      player1SocketIds.forEach((socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        socket.join(room);
      });
    }

    if (Array.isArray(player2SocketIds) && player2SocketIds.length) {
      player2SocketIds.forEach((socketId) => {
        const socket = io.sockets.sockets.get(socketId);
        socket.join(room);
      });
    }

    // Check if room exists and emit open chat event to all joined sockets
    if (io.sockets.adapter.rooms.get(room)) {
      let data = {
        room: room,
        chatRoomId: chatRoomId,
        matchId: matchId,
        players: members,
        matchStatus: matchStatus.WAITING,
      };
      io.sockets.in(room).emit(events.OPEN_CHAT, JSON.stringify(data));
      logger.debug("OPEN CHAT EMITTED to sockets in room: " + room);
    } else {
      throw new Error(`Socket room with roomId: ${room} not found.`);
    }

    return;
  } catch (error) {
    logger
      .child({ context: ctx })
      .error(`Error occurred on opening chat for matchId: ${matchId}, details: ${error}`);
  }
};

const openChatOnConnection = async (socket) => {
  let ctx = {};
  try {
    const userId = socket.request.user.id;
    const userMatch = await getUserMatch(userId);

    ctx.userId = userId;
    ctx.match = JSON.stringify(userMatch);

    if (userMatch && !userMatch.error) {
      const match = userMatch.matches[0];

      if (
        match.status == matchStatus.IN_PROGRESS ||
        match.status == matchStatus.WAITING
      ) {
        const players = match.users.map((user) => {
          return {
            id: user.id,
            userName: user.userName,
            avatar: user.user_profile.avatar,
          };
        });

        const chatRoomId = match.chat_room.id;
        const room = getARoom(chatRoomId);
        ctx.room = room;

        let data = {
          room: room,
          chatRoomId: chatRoomId,
          matchId: match.id,
          players: players,
          matchStatus: match.status,
        };

        // IF start request sent by player send requester's id
        if (match.status == matchStatus.WAITING) {
          if (match.startRequestByPlayer) {
            data.startRequestByPlayer = match.startRequestByPlayer;
          } else if (match.rejectedByPlayer) {
            data.rejectedByPlayer = match.rejectedByPlayer;
          }
        }

        if (match.status == matchStatus.IN_PROGRESS) {
          const matchSubmission = await getMatchSubmission(match.id);

          if (matchSubmission && !matchSubmission.error) {
            data.submittedByPlayer = matchSubmission.player1Id
              ? matchSubmission.player1Id
              : matchSubmission.player2Id;
          }
        }

        socket.join(room);
        io.to(socket.id).emit(events.OPEN_CHAT, JSON.stringify(data));
        logger.debug("OPEN CHAT EMITTED to socket id: " + socket.id);
      }
    }
    return;
  } catch (error) {
    logger
      .child({ context: ctx })
      .error(
        `Error occured on opening match chat for socketId: ${socket.id}, details: ${error}`
      );
  }
};

const sendMessageToRoom = async (messageObj, chatRoomId) => {
  const room = getARoom(chatRoomId);
  io.to(room).emit(events.MESSAGE_RECEIVED, JSON.stringify(messageObj));
  logger.debug(`message sent to room: ${room}. messageObj: ${messageObj}`);
};

const emitStartMatchRequest = (chatRoomId, userId) => {
  const room = getARoom(chatRoomId);
  const data = {
    startRequestByPlayer: userId,
  };
  io.to(room).emit(events.START_MATCH_REQUEST, JSON.stringify(data));
  logger.debug(`Sending start match request to room: ${room}, by userId: ${userId}`);
};

const emitRejectMatchRequest = (chatRoomId, userId) => {
  const room = getARoom(chatRoomId);
  const data = {
    rejectedByPlayer: userId,
  };
  io.to(room).emit(events.REJECT_MATCH_REQUEST, JSON.stringify(data));
  logger.debug(`Rejecting start match request in room: ${room}, by userId: ${userId}`);
};

const emitAcceptMatchRequest = (chatRoomId, userId) => {
  const room = getARoom(chatRoomId);
  const data = {
    acceptedByPlayer: userId,
    matchStatus: matchStatus.IN_PROGRESS,
  };
  io.to(room).emit(events.ACCEPT_MATCH_REQUEST, JSON.stringify(data));
  logger.debug(`Accepting start match request in room: ${room}, by userId: ${userId}`);
};

const emitResultSubmission = (
  chatRoomId,
  userId,
  status,
  winnerId,
  completionResult,
  matchDetails,
  matchResult
) => {
  const room = getARoom(chatRoomId);
  let data = { result: matchResult == "true" ? "win" : "lose" };

  matchDetails.gameProfile.isFree && matchDetails.match.entryFee == 0
    ? (data.freeMatch = true)
    : (data.freeMatch = false);

  if (winnerId) {
    data = {
      ...data,
      submittedByPlayer: userId,
      matchStatus: status ? status : matchStatus.IN_PROGRESS,
      winnerId,
      prizeCredits: completionResult.prizeCredits,
    };
  } else {
    data = {
      ...data,
      submittedByPlayer: userId,
      matchStatus: status ? status : matchStatus.IN_PROGRESS,
    };
  }

  io.to(room).emit(events.RESULT_SUBMISSION, JSON.stringify(data));
  logger
    .child({ context: { data } })
    .info(
      `Submitting matchResult in room: ${room}, by userId: ${userId}, matchStatus: ${data.matchStatus}`
    );
};

module.exports = {
  openChat,
  openChatOnConnection,
  sendMessageToRoom,
  emitStartMatchRequest,
  emitRejectMatchRequest,
  emitAcceptMatchRequest,
  emitResultSubmission,
};
