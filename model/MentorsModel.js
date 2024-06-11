const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MentorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profile_picture: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    experience: String,
    tech_stack: {
        type: [String],
        required: true
    },
    rating: Number,
    reviews: [{
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        rating: { type: Number, required: true },
        comment: { type: String, required: true }
    }],
    availability: {
        isAvailable: { type: Boolean, required: true },
        availableDays: [String],
        availableTimes: {
            start: { type: String },
            end: { type: String }
        }
    },
    contact_information: {
        email: String,
        phone: String,
        website: String
    },
    location: {
        city: String,
        country: String
    },
    social_media_links: {
        linkedin: String,
        twitter: String,
        github: String
    },
    expertise_areas: {
        type: [String],
        required: true
    },
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const MentorModel = mongoose.model('mentors', MentorSchema);

module.exports = MentorModel;