const ClassApplication = require('../model/ClassApplication');
const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

// Enable files upload
router.use(fileUpload({
  createParentPath: true
}));

// Apply for a class
router.post('/apply', async (req, res) => {
  try {
    const { name, email, phone, country_code, classId } = req.body;
    if (!req.files || !req.files.resume) {
      return res.status(400).send('No file uploaded');
    }

    let resume = req.files.resume;
    const resumePath = './uploads/' + resume.name;
    
    // Move the uploaded file to the uploads directory
    resume.mv(resumePath, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      const newApplication = new ClassApplication({
        name,
        email,
        phone,
        country_code,
        resume: resumePath,
        classId,
      });

      await newApplication.save();
      res.status(201).send('Application submitted successfully');
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error applying for class');
  }
});

// Approve applicant
router.put('/approve-applicant/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await ClassApplication.findById(applicationId);

    if (!application) {
      return res.status(404).send('Application not found');
    }

    application.status = 'Approved';
    await application.save();
    res.send('Application approved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error approving application');
  }
});

// Reject applicant
router.put('/reject-applicant/:id', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const application = await ClassApplication.findById(applicationId);

    if (!application) {
      return res.status(404).send('Application not found');
    }

    application.status = 'Rejected';
    await application.save();
    res.send('Application rejected successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error rejecting application');
  }
});

// Get all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await ClassApplication.find().populate('classId');
    res.send(applications);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching applications');
  }
});

module.exports = router;
