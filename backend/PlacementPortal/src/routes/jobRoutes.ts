import express from 'express';
import { createJob, getJobs } from '../controllers/jobController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = express.Router();

router.get('/', getJobs);

router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  createJob
);

export default router;
