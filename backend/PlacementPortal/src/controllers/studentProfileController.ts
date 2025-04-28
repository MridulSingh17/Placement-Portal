import { Request, RequestHandler, Response } from 'express';
import StudentProfile from '../models/StudentProfile';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';

export const createOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const { bio, skills, resumeLink } = req.body;

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId: authReq.user!.id },
      { bio, skills, resumeLink, userId: authReq.user!.id },
      { upsert: true, new: true }
    );

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};


export const getMyProfile: RequestHandler = async (req, res): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    
    const user = await User.findById(authReq.user!.id).select('-password');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return; 
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user profile' });
  }
};

