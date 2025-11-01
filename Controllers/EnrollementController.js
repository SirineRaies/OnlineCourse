const User = require('../Models/User');
const Course = require('../Models/Course');
const asyncHandler = require('express-async-handler');

const enrollUser = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body;

  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user || !course) {
    res.status(404);
    throw new Error('Utilisateur ou cours non trouvé');
  }
  if (user.courses.includes(courseId)) {
    res.status(400);
    throw new Error('Utilisateur déjà inscrit à ce cours');
  }

  user.courses.push(courseId);
  course.students.push(userId);

  await user.save();
  await course.save();

  res.status(201).json({ message: 'Inscription réussie', user, course });
});

const getCoursesByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate('courses');
  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }

  res.status(200).json(user.courses);
});


const getStudentsByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate('students');
  if (!course) {
    res.status(404);
    throw new Error('Cours non trouvé');
  }

  res.status(200).json(course.students);
});

module.exports = {enrollUser,getCoursesByUser,getStudentsByCourse};
