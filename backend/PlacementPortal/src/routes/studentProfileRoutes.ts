import express from 'express';
import { createOrUpdateProfile, getMyProfile } from '../controllers/studentProfileController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticateToken, authorizeRole('student'), getMyProfile);
router.post('/', authenticateToken, authorizeRole('student'), createOrUpdateProfile);

export default router;
