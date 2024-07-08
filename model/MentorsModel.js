const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MentorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },
  experience: String,
  tech_stack: {
    type: [String],
    required: true,
  },
  rating: Number,
  contact_information: {
    email: String,
    phone: String,
    website: String,
  },
  // Add any other fields you need for your application
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const MentorModel = mongoose.model("mentors", MentorSchema);

module.exports = MentorModel;
