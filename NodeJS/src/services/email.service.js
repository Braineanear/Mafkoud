// Packages
import { createTransport } from 'nodemailer';

// Configs
import config from '../config/config';

// Utils
import catchAsync from '../utils/catchAsync';

const transport = createTransport({
  host: config.email.smtp.host,
  service: 'Gmail',
  auth: {
    user: config.email.smtp.auth.user,
    pass: config.email.smtp.auth.pass
  }
});

const sendEmail = catchAsync(async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
});

/**
 * Send reset password mail
 * @param   {String} to
 * @param   {String} token
 */
export const sendResetPasswordEmail = catchAsync(async (to, token) => {
  const subject = 'Reset password';
  const resetPasswordUrl = `/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;

  await sendEmail(to, subject, text);
});

/**
 * Send after reset password mail
 * @param   {String} to
 * @param   {String} token
 */
export const sendAfterResetPasswordMessage = catchAsync(async (to) => {
  const subject = 'Password Reset Successfully';
  const text = `Your password has successfully been reset.
  Do not hesitate to contact us if you have any questions.`;

  await sendEmail(to, subject, text);
});
