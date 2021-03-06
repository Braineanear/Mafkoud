// Configs
import logger from '../config/logger';

// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { userService, redisService } from '../services/index';

/**
 * Create New User
 * @param     {Object} req
 * @param     {Object} res
 * @property  {Object} req.body
 * @property  {Object} req.file
 * @returns   {JSON}
 */
export const createUser = catchAsync(async (req, res) => {
  // 1) Create User Document
  const { type, message, statusCode, user } = await userService.createUser(
    req.body,
    req.file
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Get All Users
 * @param     {Object}  req
 * @param     {Object}  res
 * @property  {String}  req.query.sort
 * @property  {String}  req.query.select
 * @property  {Number}  req.query.page
 * @property  {Number}  req.query.limit
 * @returns   {JSON}
 */
export const getUsers = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting Default Params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 2) Generating Redis key
  const key = redisService.generateCacheKey(
    'users',
    `page:${page}-sortBy:${sort}-limit:${limit}-select:${select}`
  );

  // 3) Getting Cached Data From Redis
  let cached = await redisService.get(key);

  // 4) Check If Cached Data Already Exist
  if (!cached) {
    logger.error('No Caching Data');
  }

  cached = JSON.parse(cached);

  // 5) If Cached Data Exit Return it
  if (cached) {
    return res.status(200).json({
      type: 'Success',
      message: 'Users Found Successfully',
      users: cached
    });
  }

  // 6) Get All Users
  const { type, message, statusCode, users } = await userService.queryUsers(
    req
  );

  // 7) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 8) Put Data into Redis With a Specific Key
  redisService.set(key, JSON.stringify(users), 'EX', 60);

  // 9) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    users
  });
});

/**
 * Get User Data Using It's ID
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {ObjectId}  req.params.id
 * @returns   {JSON}
 */
export const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 1) Generating Redis key
  const key = redisService.generateCacheKey('user', id);

  // 2) Getting Cached Data From Redis
  let cached = await redisService.get(key);

  // 3) Check If Cached Data Already Exist
  if (!cached) {
    logger.error('No Caching Data');
  }

  cached = JSON.parse(cached);

  // 4) If Cached Data Exit Return it
  if (cached) {
    return res.status(200).json({
      type: 'Success',
      message: 'User Found Successfully',
      user: cached
    });
  }

  // 5) Find User Document By It's ID
  const { type, message, statusCode, user } = await userService.queryUser(id);

  // 6) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 7) Put Data into Redis With a Specific Key
  redisService.set(key, JSON.stringify(user), 'EX', 60);

  // 8) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Update User Details
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.body
 * @property  {ObjectId}  req.params.id
 * @returns   {JSON}
 */
export const updateUserDetails = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.updateUserDetails(req.params.id, req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Add User Profile Image
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.file
 * @property  {ObjectId}  req.params.id
 * @returns   {JSON}
 */
export const addUserProfileImage = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.addUserProfileImage(req.params.id, req.file);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Update User Profile Image
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.file
 * @property  {ObjectId}  req.params.id
 * @returns   {JSON}
 */
export const updateUserProfileImage = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.updateUserProfileImage(req.params.id, req.file);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Delete User's Data
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {ObjectId}  req.params.id
 * @returns   {JSON}
 */
export const deleteUser = catchAsync(async (req, res) => {
  // 1) Find User Document and Delete it
  const { type, message, statusCode } = await userService.deleteUser(
    req.params.id
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Message
  return res.status(statusCode).json({
    type,
    message
  });
});

/**
 * Update Me Details
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.body
 * @property  {ObjectId}  req.user.id
 * @returns   {JSON}
 */
export const updateMeDetails = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.updateUserDetails(req.user.id, req.body);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Add Me Profile Image
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.file
 * @property  {ObjectId}  req.user.id
 * @returns   {JSON}
 */
export const addMeProfileImage = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.addUserProfileImage(req.user.id, req.file);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Update Me Profile Image
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {Object}    req.file
 * @property  {ObjectId}  req.user.id
 * @returns   {JSON}
 */
export const updateMeProfileImage = catchAsync(async (req, res) => {
  // 1) Find User Document and Update it
  const { type, message, statusCode, user } =
    await userService.updateUserProfileImage(req.user.id, req.file);

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send User's Data
  return res.status(statusCode).json({
    type,
    message,
    user
  });
});

/**
 * Delete My Data
 * @param     {Object}    req
 * @param     {Object}    res
 * @property  {ObjectId}  req.user.id
 * @returns   {JSON}
 */
export const deleteMe = catchAsync(async (req, res) => {
  // 1) Find User Document and Delete it
  const { type, message, statusCode } = await userService.deleteUser(
    req.user.id
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Message
  return res.status(statusCode).json({
    type,
    message
  });
});
