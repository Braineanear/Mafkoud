// Packages
import express from 'express';

// Utils
import { singleFile } from '../utils/multer';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import { childController } from '../controllers/index';

const { addLostChild, addFoundChild, getChilds, deleteChild } = childController;

const router = express.Router();

router.route('/').get(getChilds);

router.use(auth('admin', 'security', 'user'));

router.route('/lost').post(singleFile('image'), addLostChild);

router.route('/found').post(singleFile('image'), addFoundChild);

router.route('/:id').delete(deleteChild);

export default router;
