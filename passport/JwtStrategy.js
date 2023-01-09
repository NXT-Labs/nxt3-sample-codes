const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const userService = require("../services/User/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Used by the authenticated requests to deserialize the user i.e., to fetch user details from the JWT.
const deserializeUser = async (jwt_payload, done) => {
  try {
    const user = await userService.getUser();
    if (user && user.isActive) {
      return done(null, user);
    } else {
      return done("Unauthorized", null);
    }
  } catch (error) {
    done(error, null);
  }
};

passport.use("jwt", new JwtStrategy(options, deserializeUser));
