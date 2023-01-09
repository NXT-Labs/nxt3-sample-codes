const userService = require("../../../../../../services/User/User");
const userEmailService = require("../../../../../../services/User/Email");
const sessionController = require("./Session");
const responses = require("../../../../../../constants/Responses");
const { getJwt } = require("../../../../../../utils/auth.utils");
const { eventEmitter } = require("../../../../../../config/eventEmitter.config");
const { sendMail } = require("../../../../../../utils/email.utils");
const {
  emailVerificationTemplate,
} = require("../../../../../../templates/email/email_verification");
const {
  serverErrorResponse,
  successResponse,
  notFoundResponse,
  badRequestResponse,
} = require("../../../../../../services/Response/Response");
const { logger } = require("../../../../../../logger");
const { logInfo } = require("../../../../../../common/logMessages");

// Gets required info from request and calls service to create new user record
const register = async (req, res, next) => {
  try {
    const { userName, password, email, timezone, dob } = req.body;
    const userInfo = {
      userName: userName,
      password: password,
      email: email,
      timezone: timezone,
      dob: dob,
    };
    const user = await userService.createUser(userInfo);

    //Setting user password which is later unset after login
    user.password = password;

    if (!user) {
      serverErrorResponse(res, responses.USER_REGISTRATION_FAILURE);
      return;
    } else if (user === responses.USER_ALREADY_EXISTS) {
      serverErrorResponse(res, responses.USER_ALREADY_EXISTS);
      return;
    }

    eventEmitter.emit("signup", {
      userId: user.id,
      sendMailTo: user.email,
    });

    // Calling login controller to login user after registration
    req.user = user;
    sessionController.login(req, res, next);
  } catch (error) {
    next(error);
  }
};

const verifyUserEmail = async (req, res, next) => {
  let ctx = {};
  try {
    const { userId, verificationToken } = req.params;

    const userVerified = await userEmailService.verifyUserEmail(
      userId,
      verificationToken
    );
    ctx.userVerified = userVerified;

    logInfo(logger, `user verification status is set to: ${userVerified}`);

    if (!userVerified) {
      serverErrorResponse(res, responses.EMAIL_NOT_VERIFIED);
      return;
    }

    const responseData = { userVerified: true };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { userName } = req.body;

    const userProfile = await userService.getUserByUsername(userName);

    if (!userProfile) {
      notFoundResponse(res, responses.USER_NOT_FOUND);
    }

    const verificationToken = getJwt();

    const generateEmailVerification =
      await userEmailService.generatePasswordResetVerification(
        verificationToken,
        userProfile.userId
      );

    if (!generateEmailVerification) {
      serverErrorResponse(res, responses.EMAIL_VERIFICATION_NOT_GENERATED);
      return;
    }

    const url = `${process.env.FRONT_END_URL}/ResetPassword/${userProfile.userId}/${verificationToken}`;

    await sendMail({
      from: process.env.EMAIL_USER,
      to: userProfile.email,
      subject: "Password Reset",
      html: emailVerificationTemplate(url, "Password Reset"),
    });

    const responseData = { passwordReset: true };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const createNewPassword = async (req, res, next) => {
  try {
    const { forgotPasswordToken, userId } = req.params;
    const { password } = req.body;
    const getForgotPasswordToken = true;

    // Check if provided token is same as users generated forgot password token
    const emailVerificationRecord = await userEmailService.getUserVerificationToken(
      userId,
      forgotPasswordToken,
      getForgotPasswordToken
    );
    const tokensMatch =
      emailVerificationRecord.forgotPasswordToken == forgotPasswordToken;

    if (!tokensMatch) {
      badRequestResponse(res, responses.INVALID_TOKEN);
      return;
    }

    // emailVerificationRecord.verificationToken is email verification token
    // delete record if it doesn't exist
    // else set forgot password token to null
    if (!emailVerificationRecord.verificationToken) {
      await userEmailService.deleteUserEmailVerification(userId);
    } else {
      await userEmailService.updateEmailVerification(
        { userId: userId },
        { forgotPasswordToken: null }
      );
    }

    // update user password
    const passwordUpdated = userService.updatePassword(password, userId);

    if (!passwordUpdated) {
      serverErrorResponse(res, responses.NOT_UPDATED);
      return;
    }

    const responseData = { passwordReset: true };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const verifyResetToken = async (req, res, next) => {
  try {
    const { userId, resetToken } = req.params;

    const userVerified = await userEmailService.verifyResetToken(userId, resetToken);

    if (!userVerified) {
      notFoundResponse(res, responses.TOKEN_NOT_FOUND);
      return;
    }

    const responseData = { userVerified: true };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

const getUserByProfileId = async (req, res, next) => {
  try {
    const { userProfileId } = req.params;

    await userService.incrementUserViewCount(userProfileId);

    const user = await userService.getUserByProfileId(userProfileId);

    if (!user) {
      notFoundResponse(res, responses.USER_NOT_FOUND);
      return;
    }

    user.password = undefined;

    const responseData = { user: user };
    successResponse(res, responseData);
    return;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyUserEmail,
  forgotPassword,
  createNewPassword,
  verifyResetToken,
  getUserByProfileId,
};
