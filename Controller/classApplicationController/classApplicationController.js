const ClassApplicationModel = require('../../model/classapplicationModel');
const { createNotification } = require("../NotificationController/NotificationController");

module.exports = {
  createClassApplicant: async (req, res) => {
    try {
      const classApplicant = new ClassApplicationModel(req.body);
      const savedApplicant = await classApplicant.save();
      return res.status(201).json({
        message: "Class applicant created successfully",
        data: savedApplicant,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error creating class applicant",
        error: err.message,
      });
    }
  },

  updateApplicationStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate the status
      if (!["Pending", "Approved", "Rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedApplication = await ClassApplicationModel.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!updatedApplication) {
        return res.status(404).json({ message: "Class application not found" });
      }

      // Send notification if status is approved
      if (status === "Approved") {
        await createNotification(
          updatedApplication.userId, // Assuming userId is a field in ClassApplicationModel
          "Your class application has been approved.",
          "class-application"
        );
      }

      return res.status(200).json({
        message: "Application status updated successfully",
        data: updatedApplication,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating application status",
        error: err.message,
      });
    }
  },

  getAllClassApplicants: async (req, res) => {
    try {
      const classApplicants = await ClassApplicationModel.find();
      return res.status(200).json({ data: classApplicants });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching class applicants",
        error: err.message,
      });
    }
  },

  getClassApplicantById: async (req, res) => {
    try {
      const classApplicant = await ClassApplicationModel.findById(req.params.id);
      if (!classApplicant) {
        return res.status(404).json({ message: "Class applicant not found" });
      }
      return res.status(200).json({ data: classApplicant });
    } catch (err) {
      return res.status(500).json({
        message: "Error fetching class applicant",
        error: err.message,
      });
    }
  },

  updateClassApplicant: async (req, res) => {
    try {
      const updatedApplicant = await ClassApplicationModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedApplicant) {
        return res.status(404).json({ message: "Class applicant not found" });
      }
      return res.status(200).json({
        message: "Class applicant updated successfully",
        data: updatedApplicant,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error updating class applicant",
        error: err.message,
      });
    }
  },

  deleteClassApplicant: async (req, res) => {
    try {
      const deletedApplicant = await ClassApplicationModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedApplicant) {
        return res.status(404).json({ message: "Class applicant not found" });
      }
      return res.status(200).json({ message: "Class applicant deleted successfully" });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting class applicant",
        error: err.message,
      });
    }
  },
};
