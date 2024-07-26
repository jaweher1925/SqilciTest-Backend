const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  photo: { type: String },
  role: {
    type: String,
    enum: ["admin", "mentor", "student", "entrepreneur"],
    default: "student",
  },
  portfolios: [{ type: Schema.Types.ObjectId, ref: "portfolios" }],
  enrolledRoadmaps: [{ type: Schema.Types.ObjectId, ref: "roadmaps" }],
  enrolledProjects: [{ type: Schema.Types.ObjectId, ref: "projects" }],
  enrolledClasses: [{ type: Schema.Types.ObjectId, ref: "classes" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", UserSchema);