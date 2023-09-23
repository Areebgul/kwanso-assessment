import express, { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registrationSchema, loginSchema } from '../validations/auth.validation';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    // Validate the request body against the registration schema
    const { error } = registrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await AuthService.register(email, password);
    if (!user) {
      return res.status(400).json({ error: 'Registration failed' });
    }

    res.status(201).json({ user });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate the request body against the login schema
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;

    const token = await AuthService.login(email, password);
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    res.status(200).json({ jwt: token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
