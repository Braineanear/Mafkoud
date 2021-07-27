// Packages
import express from 'express';

// Controllers
import { matchController } from '../controllers/index';

const { match, matchResult } = matchController;

const router = express.Router();

router.get('/', match);

router.post('/result', matchResult);

export default router;
