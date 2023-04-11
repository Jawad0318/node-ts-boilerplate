import { Router } from 'express';
import { register, login, confirmAuth } from '@controllers/admins.controllers';
import { checkAdminAuth } from '@middleware/auth.middleware';
const router = Router();

router.post('/', register);
router.post('/', login);
router.get('/auth', checkAdminAuth, confirmAuth);

export default router;