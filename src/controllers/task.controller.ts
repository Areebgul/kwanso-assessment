import express, { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { createTaskSchema } from '../validations/task.validation';

const router = express.Router();

// Create a new task
router.post('/create-task', async (req: Request, res: Response) => {
  try {
    // Validate the request body against the create task schema
    const { error } = createTaskSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name } = req.body;
    const task = await TaskService.createTask(name);

    res.status(201).json({ task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List tasks
router.get('/list-tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.listTasks();

    res.status(200).json({ tasks });
  } catch (error) {
    console.error('List tasks error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
