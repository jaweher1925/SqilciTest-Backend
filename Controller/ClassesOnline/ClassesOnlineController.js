const Classes = require('../../model/ClasseOnlineModel');

module.exports = {
  createClass: async (req, res) => {
    try {
      const { title, progress, duration, StartDate, mentorId, studentIds, price, description } = req.body;

      // Validate input
      if (!title || !duration || !StartDate || !mentorId || !studentIds || !price || !description) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }

      const newClass = new Classes({
        title,
        progress: progress || 0,
        duration:0,
        StartDate,
        mentorId,
        studentIds,
        price,
        description,
      });

      const savedClass = await newClass.save();
      return res.status(201).json({ success: true, data: savedClass });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Server error", error: err.message });
    }
  },

  updateClassProgress: async (req, res) => {
    try {
      const courseId = req.params.id;

      // Find the class by ID
      const course = await Classes.findById(courseId);

      if (!course) {
        return res.status(404).json({ success: false, message: 'Class not found' });
      }

      // Calculate progress based on time intervals (e.g., weeks)
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days

      if (new Date(course.StartDate) < oneWeekAgo) {
        // Increment progress by 1 if a week has passed
        course.progress += 1;

        // Save the updated class
        await course.save();
      }

      return res.status(200).json({ success: true, data: course });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  },

  getOnlineClasses: async (req, res) => {
    try {
      const onlineClasses = await Classes.find(); // Fetch all online classes

      if (!onlineClasses || onlineClasses.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No online classes found" });
      }

      return res.status(200).json({ success: true, data: onlineClasses });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  deleteClasses: async function (req, res) {
    try {
      const classId = req.params.id;

      // Find the class by ID and delete it
      const deletedClass = await Classes.findByIdAndDelete(classId);

      if (!deletedClass) {
        return res.status(404).json({
          success: false,
          message: "Class not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedClass,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },

updateClasses: async function (req, res) {
  try {
    const classId = req.params.id;
    const { title, duration,StartDate, mentorId, price, description } = req.body;

    // Find the class by ID and update its properties
    const updatedClass = await Classes.findByIdAndUpdate(
      classId,
      { title, duration,StartDate, mentorId, price, description },
      { new: true } // Return the updated document
    );

      if (!updatedClass) {
        return res.status(404).json({
          success: false,
          message: "Class not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedClass,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },
  getClass: async (req, res) => {
    try {
      const onlineClasses = await Classes.findById(req.params.id)

      if (!onlineClasses || onlineClasses.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No online classes found" });
      }

      return res.status(200).json({ success: true, data: onlineClasses });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
  getClassById: async (req, res) => {
    try {
      const onlineClass = await Classes.findById(req.params.id);

      if (!onlineClass) {
        return res.status(404).json({ success: false, message: 'Class not found' });
      }

      return res.status(200).json({ success: true, data: onlineClass });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
};