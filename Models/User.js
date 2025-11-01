const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Format d\'email invalide'],
    },

    courses:[{
        type: Schema.Types.ObjectId,
        ref: 'Course',
    }],

});
module.exports = mongoose.model('User', UserSchema);