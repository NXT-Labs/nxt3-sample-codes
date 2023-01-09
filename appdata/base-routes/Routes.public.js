const express = require("express");
const userRoutes = require("../api/v1/public/User/routes/User");
const userSessionRoutes = require("../api/v1/public/User/routes/Session");
const getResourceRoutes = require("../api/v1/public/SiteResource/routes/Get");
const matchRoutes = require("../api/v1/public/Match/routes/Match");
const getGamesRoutes = require("../api/v1/public/Game/routes/Get");
const leaderboardRoutes = require("../api/v1/public/Leaderboard/routes/Leaderboard");
const userStatRoutes = require("../api/v1/public/User/routes/Stats");
const shopRoutes = require("../api/v1/public/Shop/routes/Shop");
const searchRoutes = require("../api/v1/public/Search/routes/Search");

const payoutRoutes = require("../api/v1/public/User/routes/Payout");

const router = express.Router();

router.use("/v1/users/", userRoutes);
router.use("/v1/users/session/", userSessionRoutes);
router.use("/v1/users/gameStats/", userStatRoutes);
router.use("/v1/resources/get/", getResourceRoutes);
router.use("/v1/matches/", matchRoutes);
router.use("/v1/games/get/", getGamesRoutes);
router.use("/v1/leaderboards/", leaderboardRoutes);
router.use("/v1/shops/", shopRoutes);
router.use("/v1/search/", searchRoutes);
router.use("/v1/payouts/", payoutRoutes);




module.exports = router;
