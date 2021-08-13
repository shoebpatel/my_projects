const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      console.log('info:: ', info);
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          status: "success",
          message: 'Password reset mail sent successfully.'
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: 'Something went wrong.'
    });
  }
};

module.exports = sendEmail;