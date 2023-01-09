const { matchNotificationGenerator } = require("./match");

const generateNotifications = async (notifs) => {
  const notifications = await Promise.all(
    notifs.map(async (notif) => {
      if (notif.entityName === "Match") {
        return await matchNotificationGenerator(notif);
      }
    })
  );

  //Remove null notifications from array
  const generatedNotification = notifications.filter((notif) => notif !== null);

  return generatedNotification;
};

module.exports = {
  generateNotifications,
};
