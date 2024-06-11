const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Roadmap Page FAQs Model
const RoadmapPageFAQSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const RoadmapPageFAQModel = mongoose.model('RoadmapPageFAQ', RoadmapPageFAQSchema); // Collection name will be "roadmappagefaqs"

module.exports = RoadmapPageFAQModel;
