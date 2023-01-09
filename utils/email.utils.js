const { logError } = require("../common/logMessages");
const transporter = require("../config/nodemailer.config");
const { logger } = require("../logger");

exports.sendMail = async (mailOptions) => {
  try {
    const { from, to, subject, html } = mailOptions;
    await transporter.sendMail({
      from,
      to,
      bcc: [process.env.EMAIL_USER],
      subject,
      html,
    });
  } catch (error) {
    logError(logger, `email not sent. Details: ${error} `);
  }
};
