// Packages
import jwt from 'jsonwebtoken';
import moment from 'moment';

// Config
import config from '../config/config';
import tokenTypes from '../config/tokens';

// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { Token, User } from '../models/index';

/**
 * Generate token
 * @param   {ObjectId} userId
 * @param   {Date} expires
 * @param   {String} [secret]
 * @returns {String}
 */
export const generateToken = (
  userId,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };

  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param   {String} token
 * @param   {ObjectId} userId
 * @param   {Date} expires
 * @param   {String} type
 * @returns {Promise<Token>}
 */
export const saveToken = catchAsync(async (token, id, expires, type) => {
  // 1) Create new token document
  const tokenDoc = await Token.create({
    token,
    user: id,
    expires: expires.toDate(),
    type
  });

  // 2) If everything is OK, Send token data
  return tokenDoc;
});

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param   {String} token
 * @param   {String} type
 * @returns {Object} {type, message, statusCode, token}
 */
export const verifyToken = catchAsync(async (token, type) => {
  // 1) Verify token
  const payload = jwt.verify(token, config.jwt.secret);

  // 2) Get token data
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub
  });

  // 3) Check if token already exist or not
  if (!tokenDoc) {
    return {
      type: 'Error',
      message: 'Token Not Found',
      statusCode: 404
    };
  }

  // 4) If everything is OK, Send token
  return {
    type: 'Success',
    message: 'Token Verified Successfully',
    statusCode: 200,
    tokenDoc
  };
});

/**
 * Generate auth tokens
 * @param   {User} user
 * @returns {Object<tokens>}
 */
export const generateAuthTokens = catchAsync(async (user) => {
  // 1) Set access token expire time
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );

  // 2) Generate access token
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  // 3) Set refresh token expire time
  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );

  // 4) Generate refresh token
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  // 5) Save tokens
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  // 6) If everything is OK, Send access token & refresh token
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
});

/**
 * Generate reset password token
 * @param   {String} email
 * @returns {Object}
 */
export const generateResetPasswordToken = catchAsync(async (email) => {
  // 1) Get user's data
  const user = await User.findOne({ email });

  // 2) Set reset token expire time
  const resetTokenExpires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );

  // 3) Generate reset token
  const resetPasswordToken = generateToken(
    user.id,
    resetTokenExpires,
    tokenTypes.RESET_PASSWORD
  );

  // 4) Save reset token
  await saveToken(
    resetPasswordToken,
    user.id,
    resetTokenExpires,
    tokenTypes.RESET_PASSWORD
  );

  // 5) If everything is OK, Send reset password token
  return resetPasswordToken;
});
