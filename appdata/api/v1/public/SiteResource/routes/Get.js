const getSiteResourcesRouter = require("express").Router();
const getSiteResourceController = require("../controllers/Get");
const celebrate = require("celebrate").celebrate; // Used to validate request body data with Joi

// Validators:

getSiteResourcesRouter.get("/homePageLogos", getSiteResourceController.getHomePageLogos);
getSiteResourcesRouter.get("/timezones", getSiteResourceController.getTimezones);
getSiteResourcesRouter.get("/platforms", getSiteResourceController.getPlatforms);
getSiteResourcesRouter.get("/alerts", getSiteResourceController.getAlerts);
getSiteResourcesRouter.get("/faqs", getSiteResourceController.getFaqs);
getSiteResourcesRouter.get("/banner", getSiteResourceController.getBanner);
getSiteResourcesRouter.get("/privacyPolicies", getSiteResourceController.getPrivacyPolicies);

module.exports = getSiteResourcesRouter;
