const Notification = require("../../models/Notification");
const NotificationDetail = require("../../models/NotificationDetail");
const Notifier = require("../../models/Notifier");
const NotificationEntityType = require("../../models/NotificationEntityType");

const getNotifications = async (userId, offset, limit) => {
  const notifications = await Notification.findAll({
    where: {
      receiverId: userId,
    },
    limit: limit || 10,
    offset: offset || 0,
    include: [
      {
        model: NotificationDetail,
        include: [
          {
            model: Notifier,
          },
          {
            model: NotificationEntityType,
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  return notifications;
};

const updateNotification = async (notificationId) => {
  const notification = await Notification.update(
    {
      isRead: true,
    },
    {
      where: {
        id: notificationId,
      },
    }
  );

  return notification;
};
module.exports = {
  getNotifications,
  updateNotification,
};
