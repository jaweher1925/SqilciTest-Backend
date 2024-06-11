
const { Mongoose } = require("mongoose");
const RoadmapProgressModel = require('../../model/roadMapProgress');

module.exports = {
    createRoadmapProgress: async (req, res) => {
        try {
            const roadmapProgress = new RoadmapProgressModel(req.body);
            const savedRoadmapProgress = await roadmapProgress.save();
            return res.status(201).json({ message: 'success', data: savedRoadmapProgress });
        } catch (err) {
            return res.status(500).json({ message: 'error creating roadmap data ', err });
        }
    },

    // modified function
    getRoadmapProgress: async (req, res) => {
        try {
            const roadmapProgress = await RoadmapProgressModel.find({});
            if (!roadmapProgress || roadmapProgress.length === 0) {
                return res.status(404).json({ message: 'No roadmap progress data found' });
            }
            return res.status(200).json({ data: roadmapProgress });
        } catch (err) {
            return res.status(500).json({ message: 'Error retrieving roadmap progress data', error: err });
        }
    },
    // modified function
    getRoadmapProgressById: async (req, res) => {
        try {
            const roadmapProgress = await RoadmapProgressModel.findById(req.params.id);
            if (!roadmapProgress) {
                return res.status(404).json({ message: 'Roadmap progress not found' });
            }
            return res.status(200).json({ data: roadmapProgress });
        } catch (err) {
            return res.status(500).json({ message: 'Error retrieving roadmap progress data', error: err });
        }
    },

    updateRoadmapProgress: async (req, res) => {
        try {
            const updatedRoadmapProgress = await RoadmapProgressModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedRoadmapProgress) {
                return res.status(404).json({ message: 'Roadmap progress not found' });
            }
            return res.status(200).json({ message: 'success', data: updatedRoadmapProgress });
        } catch (err) {
            return res.status(500).json({ message: 'error', err });
        }
    },

    deleteRoadmapProgress: async (req, res) => {
        try {
            const deletedRoadmapProgress = await RoadmapProgressModel.findByIdAndDelete(req.params.id);
            if (!deletedRoadmapProgress) {
                return res.status(404).json({ message: 'Roadmap progress not found' });
            }
            return res.status(200).json({ message: 'Roadmap progress deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'error', err });
        }
    }
};
