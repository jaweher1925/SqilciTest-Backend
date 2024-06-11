const TestimonialModel = require('../../model/TestimonialModel');

module.exports = {
    createTestimonial: async (req, res) => {
        try {
            const testimonial = new TestimonialModel(req.body);
            const savedTestimonial = await testimonial.save();
            return res.status(201).json({ message: 'Testimonial created successfully', data: savedTestimonial });
        } catch (err) {
            return res.status(500).json({ message: 'Error creating testimonial', error: err.message });
        }
    },

    getAllTestimonials: async (req, res) => {
        try {
            const testimonials = await TestimonialModel.find();
            return res.status(200).json({ data: testimonials });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching testimonials', error: err.message });
        }
    },

    getTestimonialById: async (req, res) => {
        try {
            const testimonial = await TestimonialModel.findById(req.params.id);
            if (!testimonial) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            return res.status(200).json({ data: testimonial });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching testimonial', error: err.message });
        }
    },

    updateTestimonial: async (req, res) => {
        try {
            const updatedTestimonial = await TestimonialModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedTestimonial) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            return res.status(200).json({ message: 'Testimonial updated successfully', data: updatedTestimonial });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating testimonial', error: err.message });
        }
    },

    deleteTestimonial: async (req, res) => {
        try {
            const deletedTestimonial = await TestimonialModel.findByIdAndDelete(req.params.id);
            if (!deletedTestimonial) {
                return res.status(404).json({ message: 'Testimonial not found' });
            }
            return res.status(200).json({ message: 'Testimonial deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting testimonial', error: err.message });
        }
    }
};
