const i18next = require("i18next");
const { eventEmitter } = require("../config/eventEmitter.config.js");
const matchNotificationService = require("../services/Notification/Match");
const { notificationTemplate } = require("../templates/email/notification.js");
const { DISPUTE_CREATED } = require("../constants/NotificationActions.js");
const { getUserByProfileId } = require("../services/User/User.js");
const { emitDisputeNotification } = require("../socketIo/noitifcations/emitters.js");
const { logger } = require("../logger/index.js");

eventEmitter.on("dispute", async (data) => {
  let { receivers, matchId, roomId } = data;
  const userNames = await Promise.all(
    receivers.map(async (id) => {
      const userProfile = await getUserByProfileId(id);
      return userProfile.user.userName;
    })
  );

  // todo: add admins id dynamically
  receivers.push(1);
  let notif = await matchNotificationService.createDisputeNotifications(
    receivers,
    matchId
  );

  i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    debug: false,
    resources: {
      en: {
        translation: {
          key: "hello world",
        },
      },
    },
  });

  const message = i18next.t(notificationTemplate.dispute, {
    actionType: DISPUTE_CREATED,
    player1: userNames[0],
    player2: userNames[1],
  });
  notif = JSON.parse(JSON.stringify(notif));
  notif.message = message;

  emitDisputeNotification(roomId, notif);

  return;
});
