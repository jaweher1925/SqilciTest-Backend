const mongoose = require('mongoose');

const ClassesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  mentorId: {
    type: String,
    required: true,
  },
  studentIds: {
    type: [String], // Array of student IDs enrolled in the class
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Classes = mongoose.models.Classes || mongoose.model('Classes', ClassesSchema);

module.exports = Classes;
