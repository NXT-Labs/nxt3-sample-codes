const SiteLogo = require("../../models/SiteLogo");
const Timezone = require("../../models/Timezone");
const Platform = require("../../models/Platform");
const Alert = require("../../models/Alert");
const { Op } = require("sequelize");
const Faq = require("../../models/Faq");
const PrivacyPolicy = require("../../models/PrivacyPolicy");
const Banner = require("../../models/Banner");

const getLogosByPage = async (page) => {
  try {
    const logos = await SiteLogo.findAll({
      where: {
        page: page,
      },
    });

    return logos;
  } catch (error) {
    console.error(error);
  }
};

const getTimezones = async () => {
  try {
    const timezones = await Timezone.findAll({
      where: {
        status: true,
      },
    });
    return timezones;
  } catch (error) {
    console.error(error);
  }
};

const getPlatforms = async (name) => {
  try {
    const platforms = await Platform.findAll({
      where: {
        status: true,
        platform: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      attributes: ["id", "platform", "status"],
    });
    return platforms;
  } catch (error) {
    console.error(error);
  }
};

const getAlerts = async () => {
  try {
    const alerts = await Alert.findAll({
      attributes: ["id", "label"],
    });
    return alerts;
  } catch (error) {
    console.error(error);
  }
};

const getFaqs = async () => {
  try {
    const faqs = await Faq.findAll();
    return faqs;
  } catch (error) {
    console.error(error);
  }
};

const getPrivacyPolicies = async () => {
  try {
    const privacyPolicies = await PrivacyPolicy.findAll({
      where: {
        status: true,
      },
    });
    return privacyPolicies;
  } catch (error) {
    console.error(error);
  }
};

const getBanner = async (bannerId) => {
  try {
    const BannerDetail = await Banner.findOne({
      where: { id: bannerId },
    });

    return BannerDetail;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getLogosByPage,
  getTimezones,
  getPlatforms,
  getAlerts,
  getFaqs,
  getPrivacyPolicies,
  getBanner,
};
