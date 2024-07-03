const mongoose = require('mongoose');

const ClassesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type:  Number,
    default: 0,
  },
  StartDate:{
    type: Date,

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
    type: [String],
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
