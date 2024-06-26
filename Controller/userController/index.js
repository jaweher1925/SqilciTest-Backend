const UserModel = require("../../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateJWT, authorizeRole } = require("../../utils/auth");

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

  getUsers: [
    authenticateJWT,
    authorizeRole(["admin", "mentor"]),
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
  ],

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

      const user = await UserModel.findById(req.params.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user profile:", error);  // Add logging for debugging
      res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
    }
  },


 updateUserProfile : async (req, res) => {
    try {
      const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
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

        if (!projectId) {
          return res.status(400).json({ message: "Project ID is required" });
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
};
