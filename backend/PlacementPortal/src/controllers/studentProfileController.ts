import { Request, Response } from 'express';
import StudentProfile from '../models/StudentProfile';
import { AuthRequest } from '../middleware/auth';

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

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;

    const profile = await StudentProfile.findOne({ userId: authReq.user!.id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};
