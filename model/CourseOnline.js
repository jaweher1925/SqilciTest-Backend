// models/Course.js
import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  progress: Number,
 
});

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

export default Course;
