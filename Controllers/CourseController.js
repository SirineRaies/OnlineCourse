const Course = require('../Models/Course');
const asyncHandler = require('express-async-handler');

const GetAllCourses = asyncHandler (async(req, res) => {
    const Courses = await Course.find();
    res.status(200).json(Courses);
});

const createCourse = asyncHandler(async(req,res)=>{
        const {title,description,instructor}=req.body;
        if(!title || !description || !instructor){
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
        }
        const course = await Course.create({title,description,instructor});
        res.status(201).json({message:'Course crée avec succés',course});

});

const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) {
        res.status(404);
        throw new Error('Course non trouvé');
    }
    res.status(200).json(course);
});


module.exports = {GetAllCourses,createCourse,getCourseById};