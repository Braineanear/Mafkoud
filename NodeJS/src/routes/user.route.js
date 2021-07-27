// Packages
import express from 'express';

// Utils
import { singleFile } from '../utils/multer';

// Middlewares
import auth from '../middlewares/auth';

// Controllers
import {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  addUserProfileImage,
  deleteUser,
  deleteMe,
  updateMeDetails,
  updateMeProfileImage,
  addMeProfileImage
} from '../controllers/user.controller';

const router = express.Router();

router.use(auth('admin', 'user', 'security'));

router.route('/me').delete(deleteMe);

router.route('/me/details').patch(updateMeDetails);

router
  .route('/me/profile-image')
  .post(singleFile('image'), addMeProfileImage)
  .patch(singleFile('image'), updateMeProfileImage);

router.use(auth('admin'));

router.route('/').post(createUser).get(getUsers);

router.route('/:id').get(getUser).delete(deleteUser).post(updateUserDetails);

router
  .route('/:id/profile-image')
  .post(singleFile('image'), addUserProfileImage)
  .patch(singleFile('image'), updateUserProfileImage);

export default router;
