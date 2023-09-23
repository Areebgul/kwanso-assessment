import mongoose, { Schema, Document } from 'mongoose';

// Define the task schema
const taskSchema = new Schema({
  name: String,
});

// Define the Task model
export const Task = mongoose.model<ITask>('Task', taskSchema);

// Define the ITask interface
export interface ITask extends Document {
  name: string;
}

