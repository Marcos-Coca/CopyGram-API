import { Router } from 'express';
import { userSchema } from '../utils/schemas/users';
import { validationHandler } from '../utils/middlewares/validationHandler';
import { signUp, signIn, refreshTokens } from '../controllers/authController';

const router = Router();

router.post('/sign-in', signIn);

router.post('/sign-up', validationHandler(userSchema), signUp);

router.post('/refresh_tokens', refreshTokens);

module.exports = router;
