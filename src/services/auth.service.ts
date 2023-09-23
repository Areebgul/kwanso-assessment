// src/services/auth.service.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.config';
import User, { IUser } from '../models/user.model';

export class AuthService {
  static async register(email: string, password: string): Promise<IUser | { error: string }> {
    try {
      // Validate input
      if (!email || !password) {
        return { error: 'Email and password are required' };
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return { error: 'Email already in use' };
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      return { error: 'Internal Server Error' };
    }
  }

  static async login(email: string, password: string): Promise<string | { error: string }> {
    try {
      // Validate input
      if (!email || !password) {
        return { error: 'Email and password are required' };
      }

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return { error: 'User not found' };
      }

      // Compare the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { error: 'Incorrect password' };
      }

      // Generate and return a JWT token
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Internal Server Error' };
    }
  }
}
