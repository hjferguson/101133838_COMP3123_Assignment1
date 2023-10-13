const express = require('express')
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

mongoose.connect('mongodb://localhost:27017/comp3123_assignment1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(userRoutes);
app.use(employeeRoutes);