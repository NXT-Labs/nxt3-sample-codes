const { logger } = require("../logger");
const { getMatchPlayers } = require("../services/Match/Get");
const i18next = require("i18next");
const { DISPUTE_CREATED } = require("../constants/NotificationActions");
const { notificationTemplate } = require("../templates/email/notification");
const { GREEN } = require("../constants/Colors");
const { getDisputeTicket } = require("../services/Ticket/Ticket");
const { TICKET_NOT_FOUND, DISPUTE_ROOM_NOT_FOUND } = require("../constants/Responses");
const { logError } = require("../common/logMessages");
const disputeChatService = require("../services/Chat/Dispute");

i18next.init({
  lng: "en",
  debug: false,
  resources: {
    en: {
      translation: {
        key: "hello world",
      },
    },
  },
});

const matchNotificationGenerator = async (notif) => {
  if (notif.action.trim() === DISPUTE_CREATED) {
    return await disputeNotification(notif);
  }
};

const disputeNotification = async (notif) => {
  const matchId = notif.entityId;
  const disputeRoom = await disputeChatService.getDiputeRoomByMatch(matchId);

  if (!disputeRoom) {
    logError(logger, DISPUTE_ROOM_NOT_FOUND, { function: "disputeNotification" });
    return null;
  }

  const ticket = await getDisputeTicket(disputeRoom.id);

  if (!ticket) {
    logError(logger, TICKET_NOT_FOUND, {
      function: "disputeNotification",
      matchId,
      disputeRoomId: disputeRoom.id,
    });
    return null;
  }

  const matchUsers = await getMatchPlayers(matchId);
  const message = i18next.t(notificationTemplate.dispute, {
    actionType: DISPUTE_CREATED,
    player1: matchUsers[0].userName,
    player2: matchUsers[1].userName,
  });

  notif = { ...notif, message, ticketId: ticket.id, color: GREEN };

  //todo: send route
  return notif;
};

module.exports = {
  matchNotificationGenerator,
};
