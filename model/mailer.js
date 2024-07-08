const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter with your email service provider (e.g., Gmail).
const sendWelcomeEmail = async (mentor) => {
  try {
    const mailOptions = {
      from: `"Your Admin Name" <${process.env.EMAIL_USER}>`,
      to: mentor.contact_information.email,
      subject: 'Welcome to Our Platform!',
      text: `Dear ${mentor.name}, Welcome to our platform!`,
      html: `<p>Dear ${mentor.name},<br><br>Welcome to our platform!</p>`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${mentor.contact_information.email}`);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
};

const sendEmailToMentor = async (mentor) => {
  try {
    // Create a nodemailer transporter using your email credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email to mentor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mentor.contact_information.email,
      subject: "Welcome to SqilciTest!",
      text: `Hello ${mentor.name},\n\nWelcome to SqilciTest! We're excited to have you on board.\n\nBest regards,\nThe SqilciTest Team`,
    });

    console.log("Email sent successfully to mentor:", mentor.name);
  } catch (error) {
    console.error("Error sending email to mentor:", error);
    throw new Error("Failed to send email to mentor");
  }
};
module.exports = { sendWelcomeEmail, sendEmailToMentor };
