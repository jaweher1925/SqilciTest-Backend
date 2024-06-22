const { Mongoose } = require("mongoose");
const RoadmapModel = require("../../model/RoadmapModel");

module.exports = {
    createRoadmap: async (req, res) => {
        try {
            const roadmap = new RoadmapModel(req.body);
            const savedRoadmap = await roadmap.save();
            return res.status(201).json({ message: 'Roadmap created successfully', data: savedRoadmap });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create roadmap', error: err.message });
        }
    },
    createBulkRoadmaps: async (req, res) => {
        try {
            const roadmaps = req.body;
            const createdRoadmaps = await RoadmapModel.insertMany(roadmaps);
            return res.status(201).json({ message: 'Roadmaps created successfully', data: createdRoadmaps });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to create roadmaps', error: err.message });
        }
    },

    getRoadmaps: async (req, res) => {
        try {
            const roadmaps = await RoadmapModel.find();
            return res.status(200).json({ data: roadmaps });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch roadmaps', error: err.message });
        }
    },

    getRoadmapById: async (req, res) => {
        try {
            const roadmap = await RoadmapModel.findById(req.params.id);
            if (!roadmap) {
                return res.status(404).json({ message: 'Roadmap not found' });
            }
            return res.status(200).json({ data: roadmap });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to fetch roadmap', error: err.message });
        }
    },

    updateRoadmap: async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
    
            // Log the incoming data
            console.log('Incoming update data:', updateData);
    
            // Perform server-side validation
            if (!updateData.title || !updateData.image || !updateData.rating) {
                return res.status(400).json({ message: 'Required fields are missing' });
            }
    
            const updatedRoadmap = await RoadmapModel.findByIdAndUpdate(id, updateData, { new: true });
    
            if (!updatedRoadmap) {
                return res.status(404).json({ message: 'Roadmap not found' });
            }
    
            return res.status(200).json({ message: 'Roadmap updated successfully', data: updatedRoadmap });
        } catch (err) {
            console.error('Error updating roadmap:', err.message);
            return res.status(500).json({ message: 'Failed to update roadmap', error: err.message });
        }},

    deleteRoadmap: async (req, res) => {
        try {
            const deletedRoadmap = await RoadmapModel.findByIdAndDelete(req.params.id);
            if (!deletedRoadmap) {
                return res.status(404).json({ message: 'Roadmap not found' });
            }
            return res.status(200).json({ message: 'Roadmap deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Failed to delete roadmap', error: err.message });
        }
    }
};
