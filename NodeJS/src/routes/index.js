import express from 'express';

import userRoute from './user.route';
import authRoute from './auth.route';
import childRoute from './child.route';
import matchRoute from './match.route';
import cameraRoute from './camera.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/child', childRoute);
router.use('/match', matchRoute);
router.use('/camera', cameraRoute);

export default router;
