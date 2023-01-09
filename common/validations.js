// Validation Constants

module.exports = {
  minPasswordLength: 6,
  maxUserNameLength: 50,
  minUserNameLength: 1,
  maxEmailLength: 80,
  maxPasswordLength: 100,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};
