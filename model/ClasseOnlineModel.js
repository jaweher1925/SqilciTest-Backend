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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor', 
    required: true,
  },
  studentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assuming you have a User model for students
  }],
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
