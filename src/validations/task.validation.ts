import Joi from 'joi';

// Joi schema for creating a task
export const createTaskSchema = Joi.object({
  name: Joi.string().required(),
});
