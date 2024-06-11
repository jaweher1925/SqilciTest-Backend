const ProjectPageFAQModel = require('../../model/ProjectPageFAQModel');

module.exports = {
    createProjectPageFAQ: async (req, res) => {
        try {
            const projectPageFAQ = new ProjectPageFAQModel(req.body);
            const savedFAQ = await projectPageFAQ.save();
            return res.status(201).json({ message: 'Project page FAQ created successfully', data: savedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create project page FAQ', error: err.message });
        }
    },

    createBulkProjectPageFAQs: async (req, res) => {
        try {
            const faqs = req.body;
            const createdFAQs = await ProjectPageFAQModel.insertMany(faqs);
            return res.status(201).json({ message: 'Project page FAQs created successfully', data: createdFAQs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create project page FAQs', error: err.message });
        }
    },

    getProjectPageFAQs: async (req, res) => {
        try {
            const faqs = await ProjectPageFAQModel.find();
            return res.status(200).json({ data: faqs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch project page FAQs', error: err.message });
        }
    },

    getProjectPageFAQById: async (req, res) => {
        try {
            const faq = await ProjectPageFAQModel.findById(req.params.id);
            if (!faq) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ data: faq });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch FAQ', error: err.message });
        }
    },

    updateProjectPageFAQ: async (req, res) => {
        try {
            const updatedFAQ = await ProjectPageFAQModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Project page FAQ updated successfully', data: updatedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to update project page FAQ', error: err.message });
        }
    },

    deleteProjectPageFAQ: async (req, res) => {
        try {
            const deletedFAQ = await ProjectPageFAQModel.findByIdAndDelete(req.params.id);
            if (!deletedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Project page FAQ deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to delete project page FAQ', error: err.message });
        }
    }
};
