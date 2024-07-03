const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  Link : { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Event', EventSchema);
