// models/Reminder.js
const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  reminder: { type: String, required: true }
});

module.exports = mongoose.model('Reminder', reminderSchema);
