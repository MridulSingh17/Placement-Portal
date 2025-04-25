import express from 'express';
import { applyToJob, getApplicationsByJob, getApplicationsByJobId, getApplicationsByStudent, getStudentApplications, updateApplicationStatus } from '../controllers/jobApplicationController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = express.Router();

router.post('/apply', authenticateToken, authorizeRole('student'), applyToJob);

router.get('/my-applications', authenticateToken, authorizeRole('student'), getStudentApplications);

router.put('/:applicationId/status', authenticateToken, authorizeRole('admin'), updateApplicationStatus);

router.get('/job/:jobId', authenticateToken, authorizeRole('admin'), getApplicationsByJobId);

router.get('/job/:jobId', authenticateToken, authorizeRole('admin'), getApplicationsByJob);


export default router;

router.get('/student', authenticateToken, authorizeRole('student'), getApplicationsByStudent);
