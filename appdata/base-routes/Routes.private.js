const express = require("express");
const userRoutes = require("../api/v1/private/User/routes/User");
const userSessionRoutes = require("../api/v1/private/User/routes/Session");
const userStatRoutes = require("../api/v1/private/User/routes/Stats");
const matchRoutes = require("../api/v1/private/Match/routes/Match");
const chatRoutes = require("../api/v1/private/Chat/routes/Chat");
const shopRoutes = require("../api/v1/private/Shop/routes/Shop");
const payoutRoutes = require("../api/v1/private/User/routes/Payout");
const notificationRoutes = require("../api/v1/private/Notification/routes/Notification");
const disputeChatRoutes = require("../api/v1/private/Chat/routes/Dispute");
const getTIcketsRoutes = require("../api/v1/private/Ticket/routes/Get");

const adminRoutes = require("./Routes.admin");
const { verifyAdmin } = require("../../common/middlewares/adminAuthMiddleware");

const router = express.Router();

router.use("/v1/users/", userRoutes);
router.use("/v1/users/session/", userSessionRoutes);
router.use("/v1/users/gameStats/", userStatRoutes);
router.use("/v1/matches/", matchRoutes);
router.use("/v1/chats/", chatRoutes);
router.use("/v1/disputeChats/", disputeChatRoutes);
router.use("/v1/shops/", shopRoutes);
router.use("/v1/payouts/", payoutRoutes);
router.use("/v1/notifications/", notificationRoutes);
router.use("/v1/tickets/", getTIcketsRoutes);

// Admin Routes:
router.use(verifyAdmin, adminRoutes);

module.exports = router;
