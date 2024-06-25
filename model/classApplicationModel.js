const mongoose = require('mongoose');

const classApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  country_code: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
 
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classes', // Assuming you have a Class model
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const ClassApplication = mongoose.model('ClassApplication', classApplicationSchema);

module.exports = ClassApplication;
