const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoadmapProgress = require("./roadMapProgress");
const ProjectProgress = require("./projectProgress");

const PortfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  title: String,
  description: String,
  images: [String],
  tags: [String],
  likes: [{ type: Schema.Types.ObjectId, ref: "users" }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      text: String,
      createdAt: Date,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  photo:{ type: String},
  role: {
    type: String,
    enum: ["admin", "mentor", "student","Entreprenur"],
    default: "student",
  },
  portfolios: [{ type: Schema.Types.ObjectId}],
  enrolledRoadmaps: [{ type: Schema.Types.ObjectId }],
  enrolledProjects: [{ type: Schema.Types.ObjectId}],
  enrolledClasses: [{ type: Schema.Types.ObjectId}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("users", UserSchema);
