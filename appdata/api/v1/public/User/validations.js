const Joi = require("celebrate").Joi;

const commonValidations = require("../../../../../common/validations");

module.exports = {
  loginValidator: {
    //Validates requests for login
    body: {
      userName: Joi.string()
        .trim()
        .max(commonValidations.maxEmailLength)
        .label("User Name")
        .required(),
      password: Joi.string()
        .trim()
        .max(commonValidations.maxPasswordLength)
        .min(commonValidations.minPasswordLength)
        .required()
        .label("Password")
        .error(() => "Invalid Password"),
      rememberMe: Joi.boolean(),
      isAdmin: Joi.boolean().optional(),
    },
  },
  registrationValidator: {
    body: {
      userName: Joi.string()
        .trim()
        .lowercase()
        .required()
        .min(commonValidations.minUserNameLength)
        .max(commonValidations.maxUserNameLength)
        .label("User Name"),
      email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .max(commonValidations.maxEmailLength)
        .required()
        .label("Email"),
      password: Joi.string()
        .trim()
        .required()
        .max(commonValidations.maxPasswordLength)
        .min(commonValidations.minPasswordLength)
        // .regex(commonValidations.passwordRegex)
        .label("Password"),
      timezone: Joi.string().trim().required(),
      dob: Joi.string().required(),
    },
  },
  emailVerificationValidator: {
    params: {
      userId: Joi.string().trim().required(),
      verificationToken: Joi.string().trim().required(),
    },
  },
  forgotPasswordValidator: {
    body: {
      userName: Joi.string()
        .trim()
        .max(commonValidations.maxEmailLength)
        .label("User Name")
        .required(),
    },
  },
  createNewPasswordValidator: {
    params: {
      userId: Joi.string().trim().required(),
      forgotPasswordToken: Joi.string().trim().required(),
    },
    body: {
      password: Joi.string()
        .trim()
        .max(commonValidations.maxPasswordLength)
        .min(commonValidations.minPasswordLength)
        .required()
        .label("Password"),
    },
  },
  verifyResetPassword: {
    params: {
      userId: Joi.string().trim().required(),
      verificationToken: Joi.string().trim().required(),
    },
  },
  userProfile: {
    params: {
      userProfileId: Joi.string().trim().required(),
    },
  },
  userStats: {
    params: {
      userId: Joi.number().required(),
    },
  },
};
