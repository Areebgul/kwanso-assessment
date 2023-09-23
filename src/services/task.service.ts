import { Task, ITask } from '../models/task.model';

export class TaskService {
  static async createTask(name: string): Promise<ITask | null> {
    try {
      const newTask = new Task({ name });
      await newTask.save();
      return newTask;
    } catch (error) {
      console.error('Create task error:', error);
      return null;
    }
  }

  static async listTasks(): Promise<ITask[]> {
    try {
      const tasks = await Task.find();
      return tasks;
    } catch (error) {
      console.error('List tasks error:', error);
      return [];
    }
  }
}
