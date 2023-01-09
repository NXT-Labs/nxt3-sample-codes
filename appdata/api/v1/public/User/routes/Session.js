const sessionRouter = require("express").Router();
const sessionController = require("../controllers/Session");
const celebrate = require("celebrate").celebrate; // Used to validate request body data with Joi
const { verifyUserOnLogin } = require("../../../../../../utils/auth.utils");

const userValidator = require("../validations");
const { loginFromAdmin } = require("../middlewares");

sessionRouter.post(
  "/login",
  celebrate(userValidator.loginValidator),
  verifyUserOnLogin,
  loginFromAdmin,
  sessionController.login
);

sessionRouter.get("/loginFailed", sessionController.loginFailed);

module.exports = sessionRouter;
