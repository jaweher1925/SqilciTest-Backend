const Course = require('../../model/CourseSellsModel');

module.exports = {

createCourseSale: async (req, res) => {
try {
const { title, chapters, description, price, googleDriveUrl } = req.body;

  // Validate input data (e.g., title, chapters, description, price, googleDriveUrl)

  const course = new Course({
    title,
    chapters,
    description,
    price,
    googleDriveUrl,
  });

  await course.save();

  return res.status(201).json({
    message: 'Course created successfully',
    data: course,
  });
} catch (err) {
  return res.status(500).json({ message: 'Error creating course', error: err.message });
}
},

//get
getAllCourseSales : async (req, res) => {
try {
// Fetch all courses from the database
const courses = await Course.find();


  // If no courses are found, return a 404 status with an error message
  if (!courses || courses.length === 0) {
    return res.status(404).json({ message: 'No courses found' });
  }

  // If courses are found, send them as a response
  return res.status(200).json({ data: courses });
} catch (error) {
  // If an error occurs during the database operation, return a 500 status with an error message
  return res.status(500).json({ message: 'Error fetching courses', error: error.message });
}
}

}