import { login, logout, refreshAuth, resetPassword } from './auth.service';

import {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken
} from './token.service';

import {
  sendResetPasswordEmail,
  sendAfterResetPasswordMessage
} from './email.service';

import {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  addUserProfileImage,
  deleteUser
} from './user.service';

import {
  addLostChild,
  addFoundChild,
  queryChilds,
  deleteChild
} from './child.service';

import {
  sendVerificationCode,
  verifyVerificationCode,
  sendLocation
} from './sms.service';

import cameraService from './camera.service';

import { set, get, generateCacheKey } from './redis.service';

import { match, matchResult } from './match.service';

const authService = {
  login,
  logout,
  refreshAuth,
  resetPassword
};

const emailService = {
  sendResetPasswordEmail,
  sendAfterResetPasswordMessage
};

const tokenService = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken
};

const userService = {
  createUser,
  queryUsers,
  queryUser,
  updateUserDetails,
  updateUserProfileImage,
  addUserProfileImage,
  deleteUser
};

const childService = {
  addLostChild,
  addFoundChild,
  queryChilds,
  deleteChild
};

const smsService = {
  sendVerificationCode,
  verifyVerificationCode,
  sendLocation
};

const redisService = {
  set,
  get,
  generateCacheKey
};

const matchService = {
  match,
  matchResult
};

export {
  authService,
  tokenService,
  userService,
  emailService,
  childService,
  smsService,
  cameraService,
  redisService,
  matchService
};
