const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Example of enum values
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    mentors: [{
        type: Schema.Types.ObjectId,
        ref: 'Mentors'
    }],
    tech_stack: {
        type: [String],
        required: true
    },
    project_scope: {
        type: String,
        required: true
    },
    project_objective: {
        type: String,
        required: true
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

const ProjectModel = mongoose.model('Project', ProjectSchema);

module.exports = ProjectModel;
