import { Router } from 'express';
import { registerUser, loginUser, getMyProfile } from '../controllers/authController'; 
import { authenticateToken } from '../middleware/auth';


const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, getMyProfile);

export default router;
