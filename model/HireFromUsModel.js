const mongoose = require("mongoose");

const HireFromUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  organization: { type: String, required: true },
  hiringFor: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("HireFromUs", HireFromUsSchema);
