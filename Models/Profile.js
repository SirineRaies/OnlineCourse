const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, 
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);
