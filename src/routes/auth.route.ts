import { Router } from 'express';
import { login, confirmAuth, changePassword, forgot } from '@controllers/auth.controller';
import { checkUserAuth } from '@middleware/auth.middleware';
import {
    validateLogin,
    isValidated,
    changePasswordValidate,
} from '@middleware/validations.middleware';
const router = Router();

//Read 
router.post('login', validateLogin, isValidated, login);
router.get('/', checkUserAuth, confirmAuth);
router.put('/password/:userId', checkUserAuth, changePasswordValidate, isValidated, changePassword);
router.put('/forgot/:email', forgot);

export default router;
