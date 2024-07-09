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
  },
  user_id: { // Reference to User
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
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
