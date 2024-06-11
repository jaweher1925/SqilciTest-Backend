const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoadmapProgressSchema = new Schema({
    roadmap: {
        type: Schema.Types.ObjectId,
        ref: 'roadmaps'
    },
    progress: [{
        weekNumber: Number,
        completedTopics: [String],
        completedPractices: [String]
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('roadmapProgress', RoadmapProgressSchema);
