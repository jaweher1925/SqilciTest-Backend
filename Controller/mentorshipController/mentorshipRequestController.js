const MentorshipRequestModel = require('../../model/MentorshipRequestSchema');

module.exports = {
    createMentorshipRequest: async (req, res) => {
        try {
            const mentorshipRequest = new MentorshipRequestModel(req.body);
            const savedRequest = await mentorshipRequest.save();
            return res.status(201).json({ message: 'Mentorship request created successfully', data: savedRequest });
        } catch (err) {
            return res.status(500).json({ message: 'Error creating mentorship request', error: err.message });
        }
    },

    getAllMentorshipRequests: async (req, res) => {
        try {
            const requests = await MentorshipRequestModel.find();
            return res.status(200).json({ data: requests });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching mentorship requests', error: err.message });
        }
    },

    getMentorshipRequestById: async (req, res) => {
        try {
            const request = await MentorshipRequestModel.findById(req.params.id);
            if (!request) {
                return res.status(404).json({ message: 'Mentorship request not found' });
            }
            return res.status(200).json({ data: request });
        } catch (err) {
            return res.status(500).json({ message: 'Error fetching mentorship request', error: err.message });
        }
    },

    updateMentorshipRequest: async (req, res) => {
        try {
            const updatedRequest = await MentorshipRequestModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedRequest) {
                return res.status(404).json({ message: 'Mentorship request not found' });
            }
            return res.status(200).json({ message: 'Mentorship request updated successfully', data: updatedRequest });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating mentorship request', error: err.message });
        }
    },

    deleteMentorshipRequest: async (req, res) => {
        try {
            const deletedRequest = await MentorshipRequestModel.findByIdAndDelete(req.params.id);
            if (!deletedRequest) {
                return res.status(404).json({ message: 'Mentorship request not found' });
            }
            return res.status(200).json({ message: 'Mentorship request deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting mentorship request', error: err.message });
        }
    }
};
