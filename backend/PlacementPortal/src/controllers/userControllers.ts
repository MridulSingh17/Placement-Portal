import { Request, Response } from 'express';
import User from '../models/User';

export const getAllStudents = async (_req: Request, res: Response): Promise<void> => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
