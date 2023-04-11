import { middleware } from '@middleware/commons.middleware';
import { Router } from 'express';
import { create, update, getAll, getById, deleteUser } from "@controllers/users.controller";
import { checkUserAuth } from '@middleware/auth.middleware';
import { upload } from '@middleware/multer.middleware';
import { validateUser, validateUserUpdate, isValidated } from '@middleware/validations.middleware';
const router = Router();

// create user
router.post('/', upload.signle('image'), validateUser, isValidated, create);

//Read
router.get('/', checkUserAuth, getAll);
router.get('/:userId', checkUserAuth, getById);

// update

router.put('/:userId', checkUserAuth, validateUserUpdate, isValidated, update);

// delete

router.delete('./:userId', checkUserAuth, deleteUser);

export default router;
