import { Request, Response } from 'express';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const authReq = req as AuthRequest;

    if (!authReq.user || !authReq.user.id) {
      res.status(401).json({ error: 'Unauthorized: No user info in token' });
      return;
    }

    const job = await Job.create({
      ...req.body,
      postedBy: authReq.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ error: 'Job creation failed' });
  }
};

export const getJobs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
