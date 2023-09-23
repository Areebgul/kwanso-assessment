
import express from 'express';
import { connectDB } from './config/db.config';
import authController from './controllers/auth.controller';
import taskController from './controllers/task.controller';
import { authenticateJWT } from './middleware/jwt.middleware';

const app = express();

// Connect to the database
connectDB();

// Middleware for JSON parsing and error handling
app.use(express.json()); // Add this line to parse JSON data


// Use authController for '/auth' routes
app.use('/auth', authController);

// Use taskController for '/tasks' routes
app.use('/tasks', authenticateJWT, taskController);

export default app;
