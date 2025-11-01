const { Router } = require('express');
const router = Router();
const { createCourse, GetAllCourses, getCourseById } = require('../Controllers/CourseController');
const { createReview, GetAllReviewsByCourse } = require('../Controllers/ReviewController');
const { enrollUser, getStudentsByCourse } = require('../Controllers/EnrollementController');

router.get('/', GetAllCourses);
router.post('/', createCourse);
router.get('/:id', getCourseById);

router.post('/:courseId/enroll', enrollUser);
router.get('/:courseId/students', getStudentsByCourse);

router.get('/:courseId/reviews', GetAllReviewsByCourse);
router.post('/:courseId/reviews', createReview);

module.exports = router;
