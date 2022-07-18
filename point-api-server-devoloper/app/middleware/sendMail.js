var nodemailer = require("nodemailer");
const messageConfig = require("../../config/message.configs");
const config = require("../../config/auth.config");
const formEmail = require("../components/formEmail");

const sendMail = function (toEmail, userName, newPassword) {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    service: "gmail",
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  var mailOptions = {
    from: messageConfig.system,
    to: toEmail,
    subject: messageConfig.system,
    html: formEmail.content(userName, newPassword),
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
