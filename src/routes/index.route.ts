import { Router } from 'express';
import adminRoutes from './admins.route';
import userRoutes from './users.route';
import authRoutes from './auth.route';

const router = Router();

//parent routes

router.use('/admins', adminRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;