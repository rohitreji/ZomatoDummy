const nodemailer = require("nodemailer");

/**
 * Sends an email using Nodemailer.
 * @param {Object} options - { to, subject, html }
 */
const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,          // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"Zomato Clone" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
