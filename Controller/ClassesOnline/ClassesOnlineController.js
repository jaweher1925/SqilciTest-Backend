const Classes = require('../../model/ClasseOnlineModel');
const Applicants = require('../../model/classApplicationModel'); 
module.exports = {
  // Endpoint for admin to create a new class
  createClass: async (req, res) => {
    try {
      // Extract class details from request body
      const { title, progress, duration, mentorId, studentIds, price, description ,   Notification} = req.body;

      // Validate input
      if (!title || !duration || !mentorId || !studentIds || !price || !description || !Notification) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }

      // Create a new class document
      const newClass = new Classes({
        title,
        progress: progress || 0,
        duration,
        mentorId,
        studentIds,
        price,
        description,
        Notification
      });

      // Save the new class document
      const savedClass = await newClass.save();
      return res.status(201).json({ success: true, data: savedClass });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  },
  updateClasses: async (req, res) => {
    try {
      const classId = req.params.id;
      const { title, duration, mentorId, price, description ,   Notification} = req.body;

      const updatedClass = await Classes.findByIdAndUpdate(
        classId,
        { title, duration, mentorId, price, description ,  Notification},
        { new: true }
      );

      if (!updatedClass) {
        return res.status(404).json({
          success: false,
          message: 'Class not found',
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


  deleteClasses: async (req, res) => {
    try {
      const classId = req.params.id;

      const deletedClass = await Classes.findByIdAndDelete(classId);

      if (!deletedClass) {
        return res.status(404).json({
          success: false,
          message: 'Class not found',
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

  // Endpoint for admin to get all online classes
  getOnlineClasses: async (req, res) => {
    try {
      const onlineClasses = await Classes.find(); // Fetch all online classes

      if (!onlineClasses || onlineClasses.length === 0) {
        return res.status(404).json({ success: false, message: 'No online classes found' });
      }

      return res.status(200).json({ success: true, data: onlineClasses });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  // Endpoint for admin to get all class applicants
  getClassApplicants: async (req, res) => {
    try {
      const applicants = await Applicants.find(); // Fetch all class applicants

      if (!applicants || applicants.length === 0) {
        return res.status(404).json({ success: false, message: 'No applicants found' });
      }

      return res.status(200).json({ success: true, data: applicants });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },

  // Endpoint for student to apply for a class
  applyForClass: async (req, res) => {
    try {
      const { studentId, classId, applicationDetails } = req.body;

      // Validate input
      if (!studentId || !classId || !applicationDetails) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
      }

      // Save the application details to the class applicants collection
      const newApplication = new Applicants({
        studentId,
        classId,
        applicationDetails,
        status: 'Pending' // Set initial status as Pending
      });

      const savedApplication = await newApplication.save();
      return res.status(201).json({ success: true, data: savedApplication });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
  },

 
  // Endpoint for admin to approve an applicant and move them to class collection
  approveApplicant: async (req, res) => {
    try {
      const applicantId = req.params.id;

      // Find the applicant by ID
      const applicant = await Applicants.findById(applicantId);

      if (!applicant) {
        return res.status(404).json({
          success: false,
          message: 'Applicant not found',
        });
      }

      // Update the status to Approved
      applicant.status = 'Approved';

      // Move the applicant to the class collection
      const newClass = new Classes({
        title: applicant.applicationDetails.title,
        progress: 0,
        duration: applicant.applicationDetails.duration,
        mentorId: applicant.applicationDetails.mentorId,
        studentIds: [applicant.studentId], // Add the student to the studentIds array
        price: applicant.applicationDetails.price,
        description: applicant.applicationDetails.description,
        Notification:applicant.applicationDetails.Notification
      });

      // Save the new class document
      const savedClass = await newClass.save();

      // Delete the applicant from the class applicants collection
      await Applicants.findByIdAndDelete(applicantId);

      return res.status(200).json({
        success: true,
        message: 'Applicant approved and moved to class collection',
        data: savedClass,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};
