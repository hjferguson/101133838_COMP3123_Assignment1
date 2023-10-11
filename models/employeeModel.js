const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
        maxlength: 100
    },
    last_name:{
        type: String,
        required : true,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other'], //allows for only 3 options
        required: true
    },
    salary:{
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Employee', employeeSchema);