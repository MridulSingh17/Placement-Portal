import express from 'express';

import { authenticateToken, authorizeRole } from '../middleware/auth';
import { getAllStudents } from '../controllers/userControllers';

const router = express.Router();


router.get('/students', authenticateToken, authorizeRole('admin'), getAllStudents);

export default router;
