// pages/api/courses.js
import dbConnect from '../../config/dbConn';
import Course from '../../models/CourseOnline';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const courses = await Course.find({});
      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
