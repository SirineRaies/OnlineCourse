const Review = require('../Models/Review');
const Course = require('../Models/Course');
const asyncHandler = require('express-async-handler');

const createReview = asyncHandler(async (req, res) => {
    const { rating, comment, user } = req.body;
    const { courseId } = req.params;

    if (!rating || !user) {
        res.status(400);
        throw new Error("Veuillez remplir tous les champs requis");
    }

    const course = await Course.findById(courseId);
    if (!course) {
        res.status(404);
        throw new Error("Cours non trouvé");
    }

    const review = await Review.create({
        rating,
        comment,
        course: courseId,
        user
    });

    res.status(201).json({ message: "Review créée avec succès", review });
});

const GetAllReviewsByCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const reviews = await Review.find({ course: courseId })
        .populate('user', 'username email')
        .populate('course', 'title');

    if (!reviews || reviews.length === 0) {
        res.status(404);
        throw new Error("Aucune review trouvée pour ce cours");
    }

    res.status(200).json(reviews);
});

module.exports = { GetAllReviewsByCourse, createReview };
