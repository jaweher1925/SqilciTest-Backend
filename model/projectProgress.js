const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectProgressSchema = new Schema({
    project: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    },
    progress: {
        completed: Boolean,
        completionDate: Date,
        mentorFeedback: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('projectProgress', ProjectProgressSchema);
