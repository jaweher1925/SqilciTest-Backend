const ProjectApplicantModel = require('../../model/ProjectApplicants');

module.exports = {
    createProjectApplicant: async (req, res) => {
        try {
            const projectApplicant = new ProjectApplicantModel(req.body);
            const savedApplicant = await projectApplicant.save();
            return res.status(201).json({ message: 'Project applicant created successfully', data: savedApplicant });
        } catch (err) {
            return res.status(500).json({ message: 'Error creating project applicant', error: err.message });
        }
    },

    getAllProjectApplicants: async (req, res) => {
        try {
            const applicants = await ProjectApplicantModel.find();
            return res.status(200).json({ data: applicants });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching project applicants', error: err.message });
        }
    },

    getProjectApplicantById: async (req, res) => {
        try {
            const applicant = await ProjectApplicantModel.findById(req.params.id);
            if (!applicant) {
                return res.status(404).json({ message: 'Project applicant not found' });
            }
            return res.status(200).json({ data: applicant });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching project applicant', error: err.message });
        }
    },

    updateProjectApplicant: async (req, res) => {
        try {
            const updatedApplicant = await ProjectApplicantModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedApplicant) {
                return res.status(404).json({ message: 'Project applicant not found' });
            }
            return res.status(200).json({ message: 'Project applicant updated successfully', data: updatedApplicant });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating project applicant', error: err.message });
        }
    },

    deleteProjectApplicant: async (req, res) => {
        try {
            const deletedApplicant = await ProjectApplicantModel.findByIdAndDelete(req.params.id);
            if (!deletedApplicant) {
                return res.status(404).json({ message: 'Project applicant not found' });
            }
            return res.status(200).json({ message: 'Project applicant deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting project applicant', error: err.message });
        }
    }
};
