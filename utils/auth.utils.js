const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  unauthorizedResponse,
  alreadyLoggedOut,
} = require("../services/Response/Response");

exports.COOKIE_OPTIONS = {
  httpOnly: true, // Since localhost is not having https protocol,
  secure: false, //Set to false on dev environment
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "lax",
};

exports.getJwt = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: user.rememberMe
      ? process.env.SESSION_EXPIRY_LONG
      : eval(process.env.SESSION_EXPIRY),
  });
};

exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: user.rememberMe
      ? process.env.SESSION_EXPIRY_LONG
      : eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

exports.comparePassword = async (password, passwordToCompareWith) => {
  try {
    return await bcrypt.compare(password, passwordToCompareWith);
  } catch (error) {
    console.error(error);
  }
};

exports.verifyUser = function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        if (req.path == "/v1/users/session/logout") {
          alreadyLoggedOut(res);
          return;
        }
        unauthorizedResponse(res, err);
        return;
      } else if (!user) {
        if (req.path == "/v1/users/session/logout") {
          alreadyLoggedOut(res);
          return;
        }
        unauthorizedResponse(res, info.message);
        return;
      } else {
        req.user = user;
        next();
        return;
      }
    }
  )(req, res, next);
};

exports.verifyUserOnLogin = passport.authenticate("local", {
  session: false,
});

exports.verifySocketUser = function (req, res, next) {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user, info) => {
      if (err || !user) {
        next();
        return;
      } else {
        req.user = user;
        next();
        return;
      }
    }
  )(req, res, next);
};
