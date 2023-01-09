const responses = require("../../../../../../constants/Responses");
const getSiteResourceService = require("../../../../../../services/SiteResource/Get");
const {
  serverErrorResponse,
  successResponse,
  notFoundResponse,
} = require("../../../../../../services/Response/Response");

const getHomePageLogos = async (req, res, next) => {
  try {
    const homePageLogos = await getSiteResourceService.getLogosByPage("home");

    if (!homePageLogos) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { logos: homePageLogos };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getTimezones = async (req, res, next) => {
  try {
    const timezones = await getSiteResourceService.getTimezones();

    if (!timezones) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = {
      timezones: timezones,
    };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getPlatforms = async (req, res, next) => {
  try {
    const { platform } = req.query;

    const platforms = await getSiteResourceService.getPlatforms(platform || "");

    if (!platforms) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { platforms: platforms };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getAlerts = async (req, res, next) => {
  try {
    const alerts = await getSiteResourceService.getAlerts();

    if (!alerts) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { alerts: alerts };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getFaqs = async (req, res, next) => {
  try {
    const faqs = await getSiteResourceService.getFaqs();

    if (!faqs) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { faqs };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getPrivacyPolicies = async (req, res, next) => {
  try {
    const privacyPolicies = await getSiteResourceService.getPrivacyPolicies();

    if (!privacyPolicies) {
      notFoundResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = { privacyPolicies };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getBanner = async (req, res, next) => {
  try {
    const gameDeatil = await getSiteResourceService.getBanner(1);

    if (!gameDeatil) {
      serverErrorResponse(res, responses.NO_RESULT);
      return;
    }

    const responseData = gameDeatil;
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHomePageLogos,
  getTimezones,
  getPlatforms,
  getAlerts,
  getFaqs,
  getPrivacyPolicies,
  getBanner,
};
