const MentorModel = require('../../model/MentorsModel');
const { authenticateJWT } = require('../../utils/auth');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const bcrypt = require("bcrypt");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

function generateRandomPassword(length) {
  return crypto.randomBytes(length).toString('hex');
}

module.exports = {
  sendEmail: async (dto) => {
    const { sender, recipients, subject, message } = dto;

    try {
      const result = await transporter.sendMail({
        from: sender,
        to: recipients.map(recipient => recipient.address).join(', '),
        subject,
        html: message, 
        text: message,
      });

      console.log('Email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  createMentor: async (req, res) => {
    try {
      const password = generateRandomPassword(10);
      const mentor = req.body;
      const Mentor = new MentorModel({
        name : mentor.name,
        designation: mentor.designation,
        tech_stack: mentor.tech_stack,
        email :mentor.email,
        phone: mentor.phone,
        password:password
      })
    Mentor.password = await bcrypt.hash(password, 10);

      await Mentor.save();
      const sender = {
        name: 'Admin',
        address: process.env.MAIL_USER,
      };

      const recipients = [{
        name: Mentor.name,
        address: Mentor.email,
      }];

      try {
        await module.exports.sendEmail({
          sender,
          recipients,
          subject: 'Welcome to Our Platform',
          message: `Hello ${Mentor.name},<br><br>
                    Welcome to Sqilco! Your account has been created, and you can log in with the following credentials:<br><br>
                    Email: ${Mentor.email}<br>
                    Password: ${password}<br><br>
                    Best regards,<br>
                    Sqilco Team`,
        });

        console.log('Email sent');
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
      }

      return res.status(201).json({ message: "Mentor created successfully", data: Mentor });
    } catch (error) {
      console.error("Error creating mentor:", error);
      return res.status(500).json({ message: "Failed to create mentor", error: error.message });
    }
  },

  getAllMentors: async (req, res) => {
    try {
      const mentors = await MentorModel.find();
      return res.status(200).json({ data: mentors });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching mentors", error: err.message });
    }
  },

  getMentorById: async (req, res) => {
    try {
      const mentor = await MentorModel.findById(req.params.id);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      return res.status(200).json({ data: mentor });
    } catch (err) {
      return res.status(500).json({ message: "Error fetching mentor", error: err.message });
    }
  },

  updateMentor: async (req, res) => {
    try {
      const updatedMentor = await MentorModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedMentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      return res.status(200).json({ message: "Mentor updated successfully", data: updatedMentor });
    } catch (err) {
      return res.status(500).json({ message: "Error updating mentor", error: err.message });
    }
  },

  deleteMentor: async (req, res) => {
    try {
      const deletedMentor = await MentorModel.findByIdAndDelete(req.params.id);
      if (!deletedMentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      return res.status(200).json({ message: "Mentor deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error deleting mentor", error: err.message });
    }
  },

  patchEnrolledClassesMentors: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { mentorId } = req.params;
        const { classId } = req.body;

        if (!classId) {
          return res.status(400).json({ message: "Class ID is required" });
        }

        const updatedMentor = await MentorModel.findByIdAndUpdate(
          mentorId,
          { $addToSet: { enrolledClasses: classId } },
          { new: true, runValidators: true }
        );

        if (!updatedMentor) {
          return res.status(404).json({ message: "Mentor not found" });
        }

        res.status(200).json({
          message: "Enrolled classes updated successfully",
          data: updatedMentor,
        });
      } catch (error) {
        console.error("Error updating enrolled classes:", error);
        res.status(500).json({
          message: "Failed to update enrolled classes",
          error: error.message,
        });
      }
    },
  ],
};
