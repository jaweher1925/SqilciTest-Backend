const LandingPageFAQModel = require('../../model/LandingPageFAQModel');

module.exports = {
    createLandingPageFAQ: async (req, res) => {
        try {
            const landingPageFAQ = new LandingPageFAQModel(req.body);
            const savedFAQ = await landingPageFAQ.save();
            return res.status(201).json({ message: 'Landing page FAQ created successfully', data: savedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create landing page FAQ', error: err.message });
        }
    },
    createBulkLandingPageFAQs: async (req, res) => {
        try {
            const faqs = req.body;
            const createdFAQs = await LandingPageFAQModel.insertMany(faqs);
            return res.status(201).json({ message: 'Landing page FAQs created successfully', data: createdFAQs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create landing page FAQs', error: err.message });
        }
    },

    getLandingPageFAQs: async (req, res) => {
        try {
            const faqs = await LandingPageFAQModel.find();
            return res.status(200).json({ data: faqs });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch landing page FAQs', error: err.message });
        }
    },

    getLandingPageFAQById: async (req, res) => {
        try {
            const faq = await LandingPageFAQModel.findById(req.params.id);
            if (!faq) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ data: faq });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch FAQ', error: err.message });
        }
    },

    updateLandingPageFAQ: async (req, res) => {
        try {
            const updatedFAQ = await LandingPageFAQModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Landing page FAQ updated successfully', data: updatedFAQ });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to update landing page FAQ', error: err.message });
        }
    },

    deleteLandingPageFAQ: async (req, res) => {
        try {
            const deletedFAQ = await LandingPageFAQModel.findByIdAndDelete(req.params.id);
            if (!deletedFAQ) {
                return res.status(404).json({ message: 'FAQ not found' });
            }
            return res.status(200).json({ message: 'Landing page FAQ deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to delete landing page FAQ', error: err.message });
        }
    }
};
