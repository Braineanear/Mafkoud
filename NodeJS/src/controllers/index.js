import {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyPhone
} from './auth.controller';

import {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  addUserProfileImage,
  deleteUser,
  updateMeDetails,
  updateMeProfileImage,
  addMeProfileImage,
  deleteMe
} from './user.controller';

import {
  addLostChild,
  addFoundChild,
  getChilds,
  deleteChild
} from './child.controller';

import { match, matchResult } from './match.controller';

import cameraController from './camera.controller';

const authController = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyPhone
};

const userController = {
  createUser,
  getUsers,
  getUser,
  updateUserDetails,
  updateUserProfileImage,
  addUserProfileImage,
  deleteUser,
  updateMeDetails,
  updateMeProfileImage,
  addMeProfileImage,
  deleteMe
};

const childController = {
  addLostChild,
  addFoundChild,
  getChilds,
  deleteChild
};

const matchController = {
  match,
  matchResult
};

export {
  authController,
  userController,
  childController,
  cameraController,
  matchController
};
