const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
  importance: { type: String, required: true, enum: ['low', 'medium', 'high'] }, 

});

module.exports = mongoose.model('Task', TaskSchema);