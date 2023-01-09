const { verifyAdmin } = require("../../../../../common/middlewares/adminAuthMiddleware");

const loginFromAdmin = async (req, res, next) => {
  const { isAdmin } = req.body;
  if (isAdmin) {
    verifyAdmin(req, res, next);
    return;
  }
  next();
};

module.exports = {
  loginFromAdmin,
};
