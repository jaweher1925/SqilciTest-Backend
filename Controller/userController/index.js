const UserModel = require("../../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateJWT, authorizeRole } = require("../../utils/auth");
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports = {
  registerUser: async (req, res) => {
    const userModel = new UserModel(req.body);
    userModel.password = await bcrypt.hash(req.body.password, 10);
    try {
      const response = await userModel.save();
      response.password = undefined;
      return res.status(201).json({ message: "success", data: response });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to register user", error: err.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          message: "Authentication failed. Invalid email or password",
        });
      }

      const isPassEqual = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!isPassEqual) {
        return res.status(401).json({
          message: "Authentication failed. Invalid email or password",
        });
      }

      const tokenObject = {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      };
      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
        expiresIn: "4h",
      });
      res.cookie("jwtToken", jwtToken, { httpOnly: true });
      return res.status(200).json({ jwtToken, tokenObject });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to login user", error: err.message });
    }
  },

  logoutUser: async (req, res) => {
    try {
      res.clearCookie("jwtToken");
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to logout user", error: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json({ user });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to fetch user.", error: err.message });
    }
  },
  forgotPassword : async (req, res) => {
    try {
      const { email } = req.body;
      // Check if the email exists in your user database
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
      // Generate a reset token
      const token = crypto.randomBytes(20).toString("hex");
      // Store the token with the user's email in a database or in-memory store
      user.resetToken = token;
      await user.save();
      // Send the reset token to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.gmail,
          pass: process.env.password,
        },
      });
      const mailOptions = {
        from: process.env.gmail,
        to: email,
        subject: "Password Reset",
        text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Error sending email");
        } else {
          console.log(`Email sent: ${info.response}`);
          res
            .status(200)
            .send("Check your email for instructions on resetting your password");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error", error });
    }
  },
  
 resetPassword : async (req, res) => {
    const { token, password } = req.body;
    if (!token) {
      return res.status(401).json({ message: "Token invalid" });
    }
    // Find the user with the given token and update their password
    const user = await UserModel.findOne({ resetToken: token });
    if (user) {
      console.log(user);
      user.password = await bcrypt.hash(password, 10);
      user.resetToken = null;
      await user.save();
      res.status(200).send("Password updated successfully");
    } else {
      res.status(404).send("Invalid or expired token");
    }
  },
  getUsers: 
    async (req, res) => {
      try {
        const users = await UserModel.find({}, { password: 0 });
        return res.status(200).json({ data: users });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Failed to fetch users", error: err.message });
      }
    },
  

  getStudent: async (req, res) => {
    try {
      const students = await User.find({ role: "student" });
      res.status(200).json({ data: students });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      console.log("Fetching profile for user ID:", req.params.userId); // Debugging log

      const user = await UserModel.findById(req.params.userId).select(
        "-password"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user profile:", error); // Add logging for debugging
      res.status(500).json({
        message: "Failed to fetch user profile",
        error: error.message,
      });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  patchEnrolledClasses: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { userId } = req.params;
        const { classId } = req.body;

        if (!classId) {
          return res.status(400).json({ message: "Class ID is required" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $addToSet: { enrolledClasses: classId } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "Enrolled classes updated successfully",
          data: updatedUser,
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
  patchEnrolledProjects: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { userId } = req.params;
        const { projectId } = req.body;

        if (!userId || userId === "undefined") {
          return res.status(400).json({ message: "Valid User ID is required" });
        }

        if (!projectId) {
          return res.status(400).json({ message: "Project ID is required" });
        }

        // Validate that userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid User ID format" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $addToSet: { enrolledProjects: projectId } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "Enrolled projects updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        console.error("Error updating enrolled projects:", error);
        res.status(500).json({
          message: "Failed to update enrolled projects",
          error: error.message,
        });
      }
    },
  ],
  countStudents: [
    authenticateJWT,
    authorizeRole(["admin", "mentor"]),
    async (req, res) => {
      try {
        const studentCount = await UserModel.countDocuments({
          role: "student",
        });
        return res.status(200).json({
          message: "Student count retrieved successfully",
          count: studentCount,
        });
      } catch (err) {
        return res.status(500).json({
          message: "Failed to count students",
          error: err.message,
        });
      }
    },
  ],
  getUserProfile: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid User ID format" });
        }

        const user = await UserModel.findById(userId)
          .select("-password")
          .populate("enrolledClasses")
          .populate("enrolledProjects")
          .populate("enrolledRoadmaps")
          .populate("portfolios");

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "User profile retrieved successfully",
          data: user,
        });
      } catch (error) {
        console.error("Error retrieving user profile:", error);
        res.status(500).json({
          message: "Failed to retrieve user profile",
          error: error.message,
        });
      }
    },
  ],

  updateUserProfile: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { userId } = req.params;
        const updateData = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return res.status(400).json({ message: "Invalid User ID format" });
        }

        // Remove sensitive fields from updateData
        delete updateData.password;
        delete updateData.role;

        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { $set: updateData },
          { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "User profile updated successfully",
          data: updatedUser,
        });
      } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({
          message: "Failed to update user profile",
          error: error.message,
        });
      }
    },
  ],
  deleteUser: [
    authenticateJWT,
    async (req, res) => {
      try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid User ID format" });
        }

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
          return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
          message: "User deleted successfully",
          data: deletedUser,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
          message: "Failed to delete user",
          error: error.message,
        });
      }
    },
  ],
};
