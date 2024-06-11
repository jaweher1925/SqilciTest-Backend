const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestimonialSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

const TestimonialModel = mongoose.model("testimonials", TestimonialSchema);

module.exports = TestimonialModel;
