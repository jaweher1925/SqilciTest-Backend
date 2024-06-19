const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, enum: ['admin', 'instructor', 'student', 'entrepreneur', 'investor'], default: 'student' },
  portfolios: [{ type: Schema.Types.ObjectId, ref: "Portfolio" }],
  enrolledRoadmaps: [{ type: Schema.Types.ObjectId, ref: "RoadmapProgress" }],
  enrolledProjects: [{ type: Schema.Types.ObjectId, ref: "ProjectProgress" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Export the User model
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
