// Packages
import crypto from 'crypto';

// Utils
import catchAsync from '../utils/catchAsync';

// Services
import {
  authService,
  userService,
  tokenService,
  emailService,
  smsService
} from '../services/index';

/**
 * Function Generate Random Numbers According to Specific Length
 * @param {Number} len
 * @returns {String}
 */
const randomValueBase64 = (len) =>
  crypto
    .randomBytes(Math.ceil((len * 3) / 4))
    .toString('base64') // convert to base64 format
    .slice(0, len) // return required number of characters
    .replace(/\+/g, '0') // replace '+' with '0'
    .replace(/\//g, '0'); // replace '/' with '0'

/**
 * Registeration As User or Security Man
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const register = catchAsync(async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  // 1) Preventing user from choosing admin role
  if (role === 'admin') {
    return res.status(400).json({
      type: 'Error',
      message: 'Role Cannot Be [admin], Select [user / security]'
    });
  }

  // 2) Generate random code
  const code = randomValueBase64(7);

  // 3) Create user account
  const { type, message, statusCode, user } = await userService.createUser({
    name,
    email,
    password,
    phone,
    role,
    phoneCode: code
  });

  // 4) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 5) Generate tokens [Access token / Refresh token]
  const tokens = await tokenService.generateAuthTokens(user);

  const from = 'Mafkoud App';
  const text = `Verification Code is: ${code}`;

  //6) Send SMS verification code
  smsService.sendVerificationCode(from, phone, text);

  // 7) If everything OK, Send user data with tokens
  return res.status(statusCode).json({
    type,
    message,
    user,
    tokens
  });
});

/**
 * Login
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1) Login user with email & password
  const { type, message, statusCode, user } = await authService.login({
    email,
    password
  });

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) Generate auth tokens
  const tokens = await tokenService.generateAuthTokens(user);

  // 4) If everything is OK, Send user's data and tokens
  return res.status(statusCode).json({
    type,
    message,
    user,
    tokens
  });
});

/**
 * Logout
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const logout = catchAsync(async (req, res) => {
  // 1) Logout user from system
  const { type, message, statusCode } = await authService.logout(
    req.body.refreshToken
  );

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, Send message
  return res.status(statusCode).json({
    type,
    message
  });
});

/**
 * Generate Refresh Token
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  // 1) Generating refresh token
  const { type, message, statusCode, tokens } = await authService.refreshAuth(
    refreshToken
  );

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, Send tokens
  return res.status(statusCode).json({
    type,
    message,
    ...tokens
  });
});

/**
 * Forgot Password
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  // 1) Generate reset password token
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    email
  );

  // 2) Sending reset link to user email
  await emailService.sendResetPasswordEmail(email, resetPasswordToken);

  // 3) If everything is OK, Send message
  return res.status(200).json({
    type: 'Success',
    message: 'Reset Password Link Sent Successfully'
  });
});

/**
 * Reset Password
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const resetPassword = catchAsync(async (req, res) => {
  const { password, passwordConfirmation } = req.body;
  const { token } = req.query;

  // 1) Reseting password
  const { type, message, statusCode } = await authService.resetPassword(
    token,
    password,
    passwordConfirmation
  );

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, Send message
  return res.status(statusCode).json({
    type,
    message
  });
});

/**
 * Verify Phone Number
 * @param     {Object} req - Request Object
 * @param     {Object} res - Response Object
 * @returns   {JSON}
 */
export const verifyPhone = catchAsync(async (req, res) => {
  const { code } = req.body;

  // 1) Verify phone number
  const { type, message, statusCode } = await smsService.verifyVerificationCode(
    code,
    req.user.id
  );

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, Send message
  return res.status(statusCode).json({
    type,
    message
  });
});
