const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project Page FAQs Model
const ProjectPageFAQSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const ProjectPageFAQModel = mongoose.model('ProjectPageFAQ', ProjectPageFAQSchema); // Collection name will be "projectpagefaqs"

module.exports = ProjectPageFAQModel;
