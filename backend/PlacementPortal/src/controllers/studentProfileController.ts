import { Request, Response } from 'express';
import { IUser } from '../models/User';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import mongoose, { Types } from 'mongoose';
import StudentProfile from '../models/StudentProfile';

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

export const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;

    const user = await User.findById(authReq.user!.id).select('-password');
    const profile = await StudentProfile.findOne({ userId: authReq.user!.id });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ user, profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get profile' });
  }
};

export const getAllProfiles = async (_req: Request, res: Response) => {
  try {
    const profiles = await StudentProfile.find().populate('userId', 'name email');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student profiles' });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const profile = await StudentProfile.findOne({ userId: studentId }).populate('userId', 'name email');

    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return;
    }

    const existingUser = await User.findOne({ email }) as IUser & { _id: mongoose.Types.ObjectId };


    if (existingUser && existingUser._id.toString() !== authReq.user!.id) {
      res.status(400).json({ error: 'Email already in use' });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      authReq.user!.id,
      { email },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update email' });
  }
};

