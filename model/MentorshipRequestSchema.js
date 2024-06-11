const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorshipRequestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roadmap: {
        type: Schema.Types.ObjectId,
        ref: 'roadmaps'
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

const MentorshipRequestModel = mongoose.model('mentorshiprequests', MentorshipRequestSchema);

module.exports = MentorshipRequestModel;
