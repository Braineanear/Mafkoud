// External Packages
import Vonage from '@vonage/server-sdk';

// Utils
import catchAsync from '../utils/catchAsync';

// Configs
import config from '../config/config';
import logger from '../config/logger';

// Models
import { User } from '../models/index';

// Vonage Configurations
const VonageConfig = new Vonage({
  apiKey: config.vonage.api.key,
  apiSecret: config.vonage.api.secret
});

/**
 * Send SMS Service
 * @param { String } to - Phone Number
 * @return { Object } - Message | Type | Status Code
 */
export const sendVerificationCode = (from, to, text) =>
  VonageConfig.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      logger.err(err);
    } else {
      logger.info('Message sent successfully.');
    }
  });

/**
 * Send SMS Location Service
 * @param { String } to - Phone Number
 * @return { Object } - Message | Type | Status Code
 */
export const sendLocation = (from, to, text) =>
  VonageConfig.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      logger.err(err);
    } else {
      logger.info('Message sent successfully.');
    }
  });

export const verifyVerificationCode = catchAsync(async (code, id) => {
  if (!code) {
    return {
      type: 'Error',
      message: 'Please enter verification code!',
      statusCode: 400
    };
  }

  const user = await User.findById(id);

  if (!user) {
    return {
      type: 'Error',
      message: `No user found with id ${id}`,
      statusCode: 404
    };
  }

  if (user.phoneCode === code) {
    user.phoneCode = undefined;
    user.isVerified = true;
  }

  await user.save();

  return {
    type: 'Success',
    message: 'Phone Verified Successfully',
    statusCode: 200
  };
});
