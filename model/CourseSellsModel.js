const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  googleDriveUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  chapters: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
