require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./Config/DB');
const app = express();
app.use(express.json());
const usersRoutes = require('./Routes/UserRoutes');
const coursesRoutes = require('./Routes/CourseRoutes');
const {notFound,errorHandler}=require('./Middleware/ErrorHandler.js')
connectDB();

app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`Le serveur est démarré sur le port ${process.env.PORT}`);
})
