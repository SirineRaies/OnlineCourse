const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: [1, 'La note minimale est 1'],
    max: [5, 'La note maximale est 5'],
  },
  comment: {
    type: String,
  },
  course: { 
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Review', ReviewSchema);
