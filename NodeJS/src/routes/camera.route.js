// Packages
import express from 'express';

// Controllers
import { cameraController } from '../controllers/index';

const router = express.Router();

router.route('/').get(cameraController);

export default router;
