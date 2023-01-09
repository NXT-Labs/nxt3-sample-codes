const nodemailer = require("nodemailer");
const aws = require("aws-sdk");

const ses = new aws.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

module.exports = transporter;
