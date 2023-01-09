const { eventEmitter } = require("../config/eventEmitter.config.js");
const { sendMail } = require("../utils/email.utils");
const { emailVerificationTemplate } = require("../templates/email/email_verification");
const { getJwt } = require("../utils/auth.utils.js");

const userEmailService = require("../services/User/Email");
const {
  accountDisabledEmailTemplate,
} = require("../templates/email/account_disabled.js");

// Send registration email
eventEmitter.on("signup", async (data) => {
  const verificationToken = getJwt({ id: data.userId });

  await userEmailService.createNewEmailVerification({
    userId: data.userId,
    verificationToken: verificationToken,
  });

  const url = `${process.env.FRONT_END_URL}/VerifyEmail/${data.userId}/${verificationToken}`;

  await sendMail({
    from: process.env.EMAIL_USER,
    to: data.sendMailTo,
    subject: "Please Verify Email",
    html: emailVerificationTemplate(url, "Verify Email"),
  });
});

eventEmitter.on("userDisabled", async (data) => {
  await sendMail({
    from: process.env.EMAIL_USER,
    to: data.userDetails.email,
    subject: "Please Verify Email",
    html: accountDisabledEmailTemplate(process.env.EMAIL_USER),
  });
});
