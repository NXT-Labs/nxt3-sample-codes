const userRouter = require("express").Router();
const userController = require("../controllers/User");
const celebrate = require("celebrate").celebrate; // Used to validate request body data with Joi

// Validators:
const userValidator = require("../validations");

userRouter.post(
  "/register",
  celebrate(userValidator.registrationValidator),
  userController.register
);
userRouter.post(
  "/verifyUser/:userId/:verificationToken",
  celebrate(userValidator.emailVerificationValidator),
  userController.verifyUserEmail
);
userRouter.post(
  "/forgotPassword",
  celebrate(userValidator.forgotPasswordValidator),
  userController.forgotPassword
);
userRouter.post(
  "/passwordCreate/:userId/:forgotPasswordToken",
  celebrate(userValidator.createNewPasswordValidator),
  userController.createNewPassword
);
userRouter.get("/verifyResetToken/:userId/:resetToken", userController.verifyResetToken);
userRouter.get(
  "/playerProfile/:userProfileId",
  celebrate(userValidator.userProfile),
  userController.getUserByProfileId
);

module.exports = userRouter;
