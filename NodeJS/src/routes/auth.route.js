// Packages
import express from 'express';

// Utils
import { singleFile } from '../utils/multer';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import { authController } from '../controllers/index';

const {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyPhone
} = authController;

const router = express.Router();

router.post('/register', singleFile('image'), register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/refresh-tokens', refreshTokens);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.post('/verify/phone', auth('user', 'security'), verifyPhone);

export default router;
