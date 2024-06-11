const MentorModel = require('../../model/MentorsModel');

module.exports = {
    createMentor: async (req, res) => {
        try {
            const mentor = new MentorModel(req.body);
            const savedMentor = await mentor.save();
            return res.status(201).json({ message: 'success', data: savedMentor });
        } catch (err) {
            return res.status(500).json({ message: 'error', error: err.message });
        }
    },

    getAllMentors: async (req, res) => {
        try {
            const mentors = await MentorModel.find();
            return res.status(200).json({ data: mentors });
        } catch (err) {
            return res.status(500).json({ message: 'error no data present', error: err.message });
        }
    },

    getMentorById: async (req, res) => {
        try {
            const mentor = await MentorModel.findById(req.params.id);
            if (!mentor) {
                return res.status(404).json({ message: 'Mentor not found' });
            }
            return res.status(200).json({ data: mentor });
        } catch (err) {
            return res.status(500).json({ message: 'error', error: err.message });
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
                return res.status(404).json({ message: 'Mentor not found' });
            }
            return res.status(200).json({ message: 'success', data: updatedMentor });
        } catch (err) {
            return res.status(500).json({ message: 'error', error: err.message });
        }
    },

    deleteMentor: async (req, res) => {
        try {
            const deletedMentor = await MentorModel.findByIdAndDelete(req.params.id);
            if (!deletedMentor) {
                return res.status(404).json({ message: 'Mentor not found' });
            }
            return res.status(200).json({ message: 'Mentor deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'error', error: err.message });
        }
    }
};
