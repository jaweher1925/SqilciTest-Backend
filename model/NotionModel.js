const mongoose = require('mongoose');

const NotionSchema = new mongoose.Schema({
  task: { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, default: Date.now },
  folder: { type: String, default: 'Default' },
  done: { type: Boolean, default: false },
});

const Notion= mongoose.model('Notion', NotionSchema);

module.exports = Notion;
  