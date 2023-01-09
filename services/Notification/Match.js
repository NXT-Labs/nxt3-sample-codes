const Match = require("../../models/Match");
const Notification = require("../../models/Notification");
const NotificationDetail = require("../../models/NotificationDetail");
const NotificationEntityType = require("../../models/NotificationEntityType");
const Notifier = require("../../models/Notifier");
const sequelize = require("../../config/db.config");
const { DISPUTE_CREATED } = require("../../constants/NotificationActions");

const createDisputeNotifications = async (receivers, entityId) => {
  try {
    // Get notification entity type
    const entityType = await NotificationEntityType.findOne({
      where: {
        entity: "Match",
        action: DISPUTE_CREATED,
      },
      attributes: ["id"],
    });

    const notificationDetail = await NotificationDetail.create({
      entityId,
      notificationEntityTypeId: entityType.id,
    });

    await Notifier.create({
      notificationDetailId: notificationDetail.id,
      autoGenerated: true,
    });

    const notifications = await Promise.all(
      receivers.map(
        async (id) =>
          await Notification.create({
            notificationDetailId: notificationDetail.id,
            receiverId: id,
          })
      )
    );
    return {
      entityId,
      entityTypeId: entityType.id,
      notificationDetailId: notificationDetail.id,
      createdAt: notificationDetail.createdAt,
    };
  } catch (error) {
    console.error(error);
    return {
      error,
    };
  }
};

module.exports = {
  createDisputeNotifications,
};