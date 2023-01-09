const { SHOPS_NOT_FOUND, NOT_FOUND } = require("../../../../../../constants/Responses");
const {
  genericResponseByData,
  paginate,
} = require("../../../../../../services/Response/Response");
const Search = require("../../../../../../services/Search/Search");

const searchAll = async (req, res, next) => {
  try {
    const { keyword, limit } = req.body;
    let searchData = await Search.searchByUser(keyword);
    // console.log('user...result', searchData.rows);
    if (!searchData?.rows?.length) {
      searchData = await Search.searchByGames(keyword);
      // console.log('games...', searchData.rows.length);
      if (!searchData?.rows?.length) {
        searchData = null;
      } else {
        searchData.flag = "games";
      }
    } else {
      // console.log('row....', searchData.rows);
      searchData.flag = "users";
    }

    res.send(genericResponseByData(searchData, { error: NOT_FOUND }));
    return;
  } catch (error) {
    next(error);
  }
};
const AllSearch = async (req, res, next) => {
  try {
    const { keyword, limit } = req.body;
    const promiseUsers = new Promise(async (resolve, reject) => {
      let searchData = await Search.searchByUser(keyword);
      resolve(searchData);
    });
    const promiseGames = new Promise(async (resolve, reject) => {
      let searchData = await Search.searchByGames(keyword);
      resolve(searchData);
    });

    let stableData = {};
    let count = 0;
    let rows = [];
    await Promise.allSettled([promiseUsers, promiseGames]).then((result) => {
      result.forEach((item) => {
        count += item.value.count;
        rows = [...rows, ...item.value.rows];
      });
    });
    console.log("count, ", count);
    console.log("rows, ", rows);
    stableData = { count, rows };

    res.send(genericResponseByData(stableData, { error: NOT_FOUND }));
    return;
  } catch (error) {
    next(error);
  }
};
const searchByGame = async (req, res, next) => {
  try {
    const { keyword, limit } = req.body;
    let searchData = await Search.searchByGames(keyword);
    if (!searchData?.rows?.length) {
      searchData = null;
    } else {
      searchData.flag = "games";
    }
    res.send(genericResponseByData(searchData, { error: NOT_FOUND }));
    return;
  } catch (error) {
    next(error);
  }
};

const searchByUser = async (req, res, next) => {
  try {
    const { keyword, limit } = req.body;
    let searchData = await Search.searchByUser(keyword);
    if (!searchData?.rows?.length) {
      searchData = null;
    } else {
      searchData.flag = "users";
    }

    res.send(genericResponseByData(searchData, { error: NOT_FOUND }));
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AllSearch,
  searchAll,
  searchByUser,
  searchByGame,
};
