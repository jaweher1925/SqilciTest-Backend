const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectApplicantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "projects",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects",
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

const ProjectApplicantModel = mongoose.model('projectapplicants', ProjectApplicantSchema);

module.exports = ProjectApplicantModel;
