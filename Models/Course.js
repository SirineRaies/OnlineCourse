const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
    title:{
        type: String,
        required:true,
        unique:true,
        trim: true,
    },

    description:{
        type:String,
        required:true,
    },

    instructor:{
        type:String,
        required:true,
    },

    students:[{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

});
module.exports = mongoose.model('Course', CourseSchema);