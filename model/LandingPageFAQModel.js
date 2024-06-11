// Landing Page FAQs Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LandingPageFAQSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const LandingPageFAQModel = mongoose.model('LandingPageFAQ', LandingPageFAQSchema); // Collection name will be "landingpagefaqs"

module.exports = LandingPageFAQModel;
