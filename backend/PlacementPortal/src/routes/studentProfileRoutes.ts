import express from 'express';
import {
  createOrUpdateProfile,
  getMyProfile,
  getAllProfiles,
  getProfileById,
  updateEmail,
  
} from '../controllers/studentProfileController';
import { authenticateToken, authorizeRole } from '../middleware/auth';

const router = express.Router();


router.get('/me', authenticateToken, authorizeRole('student'), getMyProfile);
router.post('/', authenticateToken, authorizeRole('student'), createOrUpdateProfile);
router.patch('/email', authenticateToken, authorizeRole('student'), updateEmail);


router.get('/', authenticateToken, authorizeRole('admin'), getAllProfiles);
router.get('/:studentId', authenticateToken, authorizeRole('admin'), getProfileById);

export default router;
