const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/User/User");
const responses = require("../constants/Responses");
const { comparePassword } = require("../utils/auth.utils");
const {
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
} = require("../services/Response/Response");

const options = {
  usernameField: "userName",
  passwordField: "password",
  passReqToCallback: true,
};

// This function contains passport conditions that validates a user
const authenticateUser = async (req, userName, password, done) => {
  try {
    const user = await userService.getUser();
    if (user) {
      if (!user.isActive) {
        badRequestResponse(req.res, responses.INACTIVE_USER);
      } else {
        // Here password is compared and validated
        const passwordsMatch = await comparePassword(password, user.password);
        if (passwordsMatch) {
          done(null, user);
        } else {
          serverErrorResponse(req.res, responses.INVALID_PASSWORD);
        }
      }
    }
    // If no user exist return not found message
    else {
      notFoundResponse(req.res, responses.INVALID_USERNAME);
    }
  } catch (error) {
    serverErrorResponse(req.res, error);
  }
};

passport.use("local", new LocalStrategy(options, authenticateUser));
