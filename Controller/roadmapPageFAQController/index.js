const RoadmapPageFAQModel = require('../../model/RoadmapPageFAQModel');

module.exports = {
    createRoadmapPageFAQ: async (req, res) => {
        try {
            const roadmapPageFAQ = new RoadmapPageFAQModel(req.body);
            const savedFAQ = await roadmapPageFAQ.save();
            return res.status(201).json({ message: 'Roadmap page FAQ created successfully', data: savedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create roadmap page FAQ', error: err.message });
        }
    },

    createBulkRoadmapPageFAQs: async (req, res) => {
        try {
            const roadmaps = req.body;
            const createdFAQs = await RoadmapPageFAQModel.insertMany(roadmaps);
            return res.status(201).json({ message: 'Roadmap page FAQs created successfully', data: createdFAQs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create roadmap page FAQs', error: err.message });
        }
    },

    getRoadmapPageFAQs: async (req, res) => {
        try {
            const faqs = await RoadmapPageFAQModel.find();
            return res.status(200).json({ data: faqs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch roadmap page FAQs', error: err.message });
        }
    },

    getRoadmapPageFAQById: async (req, res) => {
        try {
            const faq = await RoadmapPageFAQModel.findById(req.params.id);
            if (!faq) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ data: faq });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch FAQ', error: err.message });
        }
    },

    updateRoadmapPageFAQ: async (req, res) => {
        try {
            const updatedFAQ = await RoadmapPageFAQModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Roadmap page FAQ updated successfully', data: updatedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to update roadmap page FAQ', error: err.message });
        }
    },

    deleteRoadmapPageFAQ: async (req, res) => {
        try {
            const deletedFAQ = await RoadmapPageFAQModel.findByIdAndDelete(req.params.id);
            if (!deletedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Roadmap page FAQ deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to delete roadmap page FAQ', error: err.message });
        }
    }
};
