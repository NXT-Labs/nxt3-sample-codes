const searchRouter = require("express").Router();
const searchControllers = require("../controllers/Search");
const { handleErrors } = require("../../../../../../utils/errorHandling.utils"); //Passport authentication functions
searchRouter.post("/searchAll", searchControllers.searchAll);
searchRouter.post("/all", searchControllers.AllSearch);
searchRouter.post("/games", searchControllers.searchByGame);
searchRouter.post("/users", searchControllers.searchByUser);
searchRouter.use(handleErrors);
module.exports = searchRouter;
