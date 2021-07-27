// Packages
import express from 'express';

// Controllers
import { cameraController } from '../controllers/index';

const router = express.Router();

router.route('/').post(cameraController);

export default router.route;
