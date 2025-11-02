require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/DB');
const usersRoutes = require('./Routes/UserRoutes');
const coursesRoutes = require('./Routes/CourseRoutes');
const { notFound, errorHandler } = require('./Middleware/ErrorHandler.js');

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);

// Middlewares
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
}

module.exports = app;
