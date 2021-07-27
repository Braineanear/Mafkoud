// Utils
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// Config
import tokenTypes from '../config/tokens';

// Services
import { sendAfterResetPasswordMessage } from './email.service';
import { verifyToken, generateAuthTokens } from './token.service';

// Models
import { Token, User } from '../models/index';

/**
 * Login With Email & Password
 * @param     {Object} body - Email & Password
 * @returns   {Object} {type, statusCode, message, user}
 */
export const login = catchAsync(async (body) => {
  const { email, password } = body;

  // 1) Check Email & Password
  if (!email || !password) {
    throw new AppError('All fields are required', 400);
  }
  // 2) Get User With Specific Email and Password
  const user = await User.findOne({ email }).select('+password');

  // 3) Check if user doesn't exist
  if (!user) {
    return {
      type: 'Error',
      message: 'Incorrect Email or Password',
      statusCode: 403
    };
  }

  const isMatch = await user.isPasswordMatch(password);

  // 4) Check if two passwords aren't the same
  if (!isMatch) {
    return {
      type: 'Error',
      message: 'Incorrect Email or Password',
      statusCode: 403
    };
  }

  // 5) If everything is OK, Send user
  return {
    type: 'Success',
    message: 'User Logged In Successfully',
    statusCode: 200,
    user
  };
});

/**
 * Logout
 * @param     {String} refreshToken
 */
export const logout = catchAsync(async (refreshToken) => {
  // 1) Find Token Document and Delete it
  const refreshTokenDoc = await Token.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false
  });

  // 2) Check if Token Already Exist
  if (!refreshTokenDoc) {
    return {
      type: 'Error',
      statusCode: 404,
      message: 'Please, Sign in Before!'
    };
  }
});

/**
 * Refresh auth tokens
 * @param     {String} refreshToken
 * @returns   {Object} { accessToken, refreshToken }
 */
export const refreshAuth = catchAsync(async (refreshToken) => {
  // 1) Verify Refresh Token
  const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);

  // 2) Find User Document and Delete it
  const user = await User.findByIdAndDelete(refreshTokenDoc.user);

  // 3) Check if User Already Exist
  if (!user) {
    throw new AppError('No User Found', 404);
  }

  // 4) If Everything is OK, Send Generate Tokens
  return generateAuthTokens(user);
});

/**
 * Reset Password
 * @param     {String} resetPasswordToken
 * @param     {String} newPassword
 */
export const resetPassword = catchAsync(
  async (resetPasswordToken, newPassword, newPasswordConfirmation) => {
    // 1) Verify Reset Password Token
    const resetPasswordTokenDoc = await verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );

    // 2) Find User and Update it's Password
    const user = await User.findByIdAndUpdate(resetPasswordTokenDoc.user, {
      password: newPassword,
      passwordConfirmation: newPasswordConfirmation
    });

    // 3) Check if User Already Exist
    if (!user) {
      throw new AppError('No User Found', 404);
    }

    // 4) Sending After Reset Password Mail
    await sendAfterResetPasswordMessage(user.email);

    // 5) Deleteing User Reset Token
    await Token.deleteMany({
      user: user.id,
      type: tokenTypes.RESET_PASSWORD
    });
  }
);
