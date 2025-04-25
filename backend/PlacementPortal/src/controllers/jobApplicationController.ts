import { Request, Response } from 'express';
import Application from '../models/JobApplication';
import Job from '../models/Job';
import { AuthRequest } from '../middleware/auth';
import JobApplication from '../models/JobApplication';

export const applyToJob = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;

  try {
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    const existingApplication = await Application.findOne({
      studentId: authReq.user?.id,
      jobId,
    });

    if (existingApplication) {
      res.status(400).json({ message: 'Already applied to this job' });
      return;
    }

    const application = await Application.create({
      studentId: authReq.user?.id,
      jobId,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ error: 'Failed to apply to job' });
  }
};

export const getStudentApplications = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;

  try {
    const applications = await Application.find({ studentId: authReq.user?.id }).populate('jobId');
    res.json(applications);
  } catch (error) {
    console.error('Fetching student applications failed:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body;
  
      const validStatuses = ['applied', 'shortlisted', 'selected', 'rejected'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Invalid status' });
        return;
      }
  
      const updatedApp = await Application.findByIdAndUpdate(
        applicationId,
        { status },
        { new: true }
      );
  
      if (!updatedApp) {
        res.status(404).json({ error: 'Application not found' });
        return;
      }
  
      res.json(updatedApp);
    } catch (error) {
      console.error('Status update error:', error);
      res.status(500).json({ error: 'Failed to update status' });
    }
  };

export const getApplicationsByJobId = async (req: Request, res: Response): Promise<void> => {
    try {
      const jobId = req.params.jobId;
  
      const applications = await JobApplication.find({ jobId })
        .populate('studentId', 'name email') // only include name and email
        .populate('jobId', 'title company'); // optional
  
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications by job ID:', error);
      res.status(500).json({ error: 'Failed to fetch applications for the job' });
    }
};

export const getApplicationsByStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const authReq = req as AuthRequest;
  
      if (!authReq.user || authReq.user.role !== 'student') {
        res.status(403).json({ error: 'Access denied' });
        return;
      }
  
      const applications = await JobApplication.find({ studentId: authReq.user.id })
        .populate('jobId', 'title company');
  
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications by student:', error);
      res.status(500).json({ error: 'Failed to fetch your applications' });
    }
  };


export const getApplicationsByJob = async (req: Request, res: Response): Promise<void> => {
    try {
      const { jobId } = req.params;
  
      if (!jobId) {
        res.status(400).json({ error: 'Job ID is required' });
        return;
      }
  
      const applications = await JobApplication.find({ jobId })
        .populate('studentId', 'name email');
  
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications by job:', error);
      res.status(500).json({ error: 'Failed to fetch applications for this job' });
    }
};



  
