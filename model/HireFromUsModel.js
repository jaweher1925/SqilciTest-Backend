const mongoose = require("mongoose");

const HireFromUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  designation: { type: String, required: true },
  organization: { type: String, required: true },
  hiringFor: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }, // Add status field
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Example for user reference
});

module.exports = mongoose.model("HireFromUs", HireFromUsSchema);
