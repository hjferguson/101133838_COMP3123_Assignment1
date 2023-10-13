const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 50

    },
    password:{
        type: String,
        required: true,
        unique: true,
        maxlength: 100 //setting it to 50, doesn't allow for strong salting and hashing. 
    }
});

module.exports = mongoose.model('User', userSchema);