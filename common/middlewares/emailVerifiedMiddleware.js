const responses = require("../../constants/Responses");
const { serverErrorResponse } = require("../../services/Response/Response");
const { checkUserEmailVerificationStatus } = require("../../services/User/Email");

const verifyEmailVerification = async (req, res, next) => {
  try {
    const user = await checkUserEmailVerificationStatus(req.user.id);

    if (!user.emailVerified) {
      serverErrorResponse(res, responses.VERIFY_EMAIL);
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyEmailVerification,
};
