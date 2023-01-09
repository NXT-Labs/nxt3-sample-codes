const express = require("express");
const removeRoutes = require("../api/v1/private/Admin/routes/Remove");
const updateRoutes = require("../api/v1/private/Admin/routes/Update");
const uploadRoutes = require("../api/v1/private/Admin/routes/Upload");
const getRoutes = require("../api/v1/private/Admin/routes/Get");
const disputeRoutes = require("../api/v1/private/Admin/routes/Dispute");
const notificationRoutes = require("../api/v1/private/Admin/routes/Notification");
const ticketRoutes = require("../api/v1/private/Admin/routes/Ticket");

const router = express.Router();

router.use("/v1/admins/remove/", removeRoutes);
router.use("/v1/admins/update/", updateRoutes);
router.use("/v1/admins/upload/", uploadRoutes);
router.use("/v1/admins/get/", getRoutes);
router.use("/v1/admins/dispute/", disputeRoutes);
router.use("/v1/admins/notifications/", notificationRoutes);
router.use("/v1/admins/tickets/", ticketRoutes);

module.exports = router;
