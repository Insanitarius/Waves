const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EUSER,
    pass: process.env.EPASS,
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    /// Mailgen instance
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Waves",
        link: `${process.env.MAIN_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro: "Welcome to Waves! We are very excited to have you on board!",
        action: {
          instructions: "To validate your account, please click here:",
          button: {
            color: "#1a73e8",
            text: "Validate your account",
            link: `${process.env.SITE_URL}verification?t=${emailToken}`,
          },
        },
        outro:
          "Need help or have questions? Just reply to this email, we will get back to you!",
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EUSER,
      to: userEmail,
      subject: "Welcome to Waves!",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {}
};

const verificationEmail = async (userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();

    /// Mailgen instance
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Waves",
        link: `${process.env.MAIN_URL}`,
      },
    });

    const email = {
      body: {
        name: userEmail,
        intro: "Please completely the verification process in order to login!",
        action: {
          instructions: "To validate your account, please click here:",
          button: {
            color: "#1a73e8",
            text: "Validate your account",
            link: `${process.env.SITE_URL}verification?t=${emailToken}`,
          },
        },
        outro:
          "Need help or have questions? Just reply to this email, we will get back to you!",
      },
    };

    let emailBody = mailGenerator.generate(email);
    let message = {
      from: process.env.EUSER,
      to: userEmail,
      subject: "Welcome to Waves!",
      html: emailBody,
    };

    await transporter.sendMail(message);
    return true;
  } catch (error) {}
};

module.exports = { registerEmail, verificationEmail };
