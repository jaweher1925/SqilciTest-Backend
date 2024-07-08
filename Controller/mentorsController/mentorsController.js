const MentorModel = require('../../model/MentorsModel');
const { authenticateJWT } = require('../../utils/auth');
const { sendWelcomeEmail, sendEmailToMentor } = require('../../Controller/sendEmailToMentor/sendEmailToMentor'); 

module.exports = {
 
 createMentor : async (req, res) => {
  try {
    const mentor = new MentorModel(req.body);
    const savedMentor = await mentor.save();
    await sendEmailToMentor(savedMentor);

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
