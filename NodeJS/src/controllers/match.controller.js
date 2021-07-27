// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { matchService, smsService } from '../services/index';

/**
 * Matching two images controller
 * @param   {Object} req - request
 * @param   {Object} res - response
 * @returns {JSON}
 */
export const match = catchAsync(async (req, res) => {
  // 1) Calling match service
  const { type, message, statusCode, data } = await matchService.match();

  // 2) Check if any error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, Send message
  return res.status(statusCode).json({
    type,
    message,
    data
  });
});

/**
 * Matching result controller
 * @param   {Object} req - request
 * @param   {Object} res - response
 * @returns {JSON}
 */
export const matchResult = catchAsync(async (req, res) => {
  // 1) Caling matching result service
  const { type, message, statusCode, location, user } =
    await matchService.matchResult(req.body);

  // 2) Check if any error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  const text = `We found your child on location ${location}. Please be aware if you didn't found your child on the location we sent to you. We are still matching his/her face with other faces on camera. So you may recieve another message with another location.`;
  const to = user.phone;
  const from = 'Mafkoud App';

  await smsService.sendLocation(from, to, text);
  // await emailService.sendLocationEmail(user.email, location);

  // 3) If everything is OK, Send message
  return res.status(statusCode).json({
    type,
    message: 'Email and SMS Message Send Successfully'
  });
});
