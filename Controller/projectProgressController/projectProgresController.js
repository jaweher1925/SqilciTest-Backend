const ProjectProgressModel = require('../../model/projectProgress');

module.exports = {
    createProjectProgress: async (req, res) => {
        try {
            const projectProgress = new ProjectProgressModel(req.body);
            const savedProgress = await projectProgress.save();
            return res.status(201).json({ message: 'Project progress created successfully', data: savedProgress });
        } catch (err) {
            return res.status(500).json({ message: 'Error creating project progress', error: err.message });
        }
    },

    getAllProjectProgress: async (req, res) => {
        try {
            const progress = await ProjectProgressModel.find();
            return res.status(200).json({ data: progress });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching project progress', error: err.message });
        }
    },

    getProjectProgressById: async (req, res) => {
        try {
            const progress = await ProjectProgressModel.findById(req.params.id);
            if (!progress) {
                return res.status(404).json({ message: 'Project progress not found' });
            }
            return res.status(200).json({ data: progress });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching project progress', error: err.message });
        }
    },

    updateProjectProgress: async (req, res) => {
        try {
            const updatedProgress = await ProjectProgressModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedProgress) {
                return res.status(404).json({ message: 'Project progress not found' });
            }
            return res.status(200).json({ message: 'Project progress updated successfully', data: updatedProgress });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating project progress', error: err.message });
        }
    },

    deleteProjectProgress: async (req, res) => {
        try {
            const deletedProgress = await ProjectProgressModel.findByIdAndDelete(req.params.id);
            if (!deletedProgress) {
                return res.status(404).json({ message: 'Project progress not found' });
            }
            return res.status(200).json({ message: 'Project progress deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting project progress', error: err.message });
        }
    }
};
