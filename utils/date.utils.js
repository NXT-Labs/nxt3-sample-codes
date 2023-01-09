const { DB_DATE_FORMAT } = require("../constants/DateFormats");
const moment = require("moment");

const getPreviousDay = () => {
  return moment().subtract(1, "days").format(DB_DATE_FORMAT);
};

const getLast30Days = () => {
  return moment().subtract(30, "days").format(DB_DATE_FORMAT);
};

const getLast7Days = () => {
  return moment().subtract(7, "days").format(DB_DATE_FORMAT);
};

const getStartOfMonthFromDate = (date) => {
  return moment(date).startOf("month").format(DB_DATE_FORMAT);
};

const getEndOfMonthFromDate = (date) => {
  return moment(date).endOf("month").format(DB_DATE_FORMAT);
};

const getStartOfWeekFromDate = (date) => {
  return moment(date).startOf("week").format(DB_DATE_FORMAT);
};

const getEndOfWeekFromDate = (date) => {
  return moment(date).endOf("week").format(DB_DATE_FORMAT);
};

const getCurrentYear = () => {
  return moment().year();
};

const getYearFromDate = (date) => {
  return moment(date).year();
};

const getMonthFromDate = (date) => {
  return moment(date).month();
};
module.exports = {
  getLast30Days,
  getLast7Days,
  getPreviousDay,
  getStartOfMonthFromDate,
  getEndOfMonthFromDate,
  getCurrentYear,
  getMonthFromDate,
  getYearFromDate,
  getStartOfWeekFromDate,
  getEndOfWeekFromDate,
};
