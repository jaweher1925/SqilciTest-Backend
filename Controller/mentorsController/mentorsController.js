const MentorModel = require('../../model/MentorsModel');
const { authenticateJWT } = require('../../utils/auth');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const fetch = require('node-fetch'); // Ensure you have node-fetch installed
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
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
        html: message, // Use html for HTML content
        text: message  // Use text for plain text content
      });

      console.log('Email sent:', result);
      return result;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error; // Ensure errors are propagated back to the caller
    }
  },

  createMentor: async (req, res) => {
    try {
      // Generate a random password for the mentor
      const password = generateRandomPassword(8);

      // Register the user first
      const registerResponse = await fetch(
        "http://localhost:5000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.contact_information.email,
            password, // Use the generated password
            phone: req.body.contact_information.phone,
            role: 'mentor',
          }),
        }
      );

      const registerResponseBody = await registerResponse.json();
  
      if (!registerResponse.ok) {
        console.error('Registration API response:', registerResponseBody);
        throw new Error('Failed to register user');
      }

      const registeredUser = registerResponseBody;

      // Create the mentor with the user ID reference
      const mentorData = {
        ...req.body,
        user_id: registeredUser._id,
        password // Save the password for sending in the email
      };
      const mentor = new MentorModel(mentorData);
      const savedMentor = await mentor.save();

      // Prepare email details
      const sender = {
        name: 'Admin',
        address: process.env.MAIL_USER,
      };

      const recipients = [{
        name: savedMentor.name,
        address: savedMentor.contact_information.email, // Assuming the mentor's email is in the savedMentor object
      }];

      try {
        const emailResult = await module.exports.sendEmail({
          sender,
          recipients,
          subject: 'Welcome to Our Platform',
          message: `Hello ${savedMentor.name},<br><br>
                    Welcome to Sqilco! Your account has been created, and you can log in with the following credentials:<br><br>
                    Email: ${savedMentor.contact_information.email}<br>
                    Password: ${password}
                    <br><br>
                    Best regards,
                    Sqilco Team`

                            });

        console.log('Email sent:', emailResult);
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
        // Handle email sending error, but allow mentor creation to continue
      }

      return res.status(201).json({ message: "Mentor created successfully", data: savedMentor });
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
      return res.status(500).json({ message: "error", error: err.message });
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
      return res.status(500).json({ message: "error", error: err.message });
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
      return res.status(200).json({ message: "success", data: updatedMentor });
    } catch (err) {
      return res.status(500).json({ message: "error", error: err.message });
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
      return res.status(500).json({ message: "error", error: err.message });
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
