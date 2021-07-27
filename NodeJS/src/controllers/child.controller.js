// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { childService } from '../services/index';

/**
 * Add Lost Child
 * @param     {Object} req
 * @param     {Object} res
 * @property  {Object} req.body
 * @property  {Object} req.file
 * @returns   {JSON}
 */
export const addLostChild = catchAsync(async (req, res) => {
  // 1) Create Child Document
  const { type, message, statusCode, child } = await childService.addLostChild(
    req.body,
    req.file,
    req.user
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    child
  });
});

/**
 * Add Found Child
 * @param     {Object} req
 * @param     {Object} res
 * @property  {Object} req.body
 * @property  {Object} req.file
 * @returns   {JSON}
 */
export const addFoundChild = catchAsync(async (req, res) => {
  // 1) Create Child Document
  const { type, message, statusCode, child } = await childService.addFoundChild(
    req.body,
    req.file,
    req.user
  );

  // 2) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    child
  });
});

/**
 * Get All Childs
 * @param     {Object}  req
 * @param     {Object}  res
 * @property  {String}  req.query.sort
 * @property  {String}  req.query.select
 * @property  {Number}  req.query.page
 * @property  {Number}  req.query.limit
 * @returns   {JSON}
 */
export const getChilds = catchAsync(async (req, res) => {
  let { page, sort, limit, select } = req.query;

  // 1) Setting Default Params
  if (!page) page = 1;
  if (!sort) sort = '';
  if (!limit) limit = 10;
  if (!select) select = '';

  // 6) Get All Lost Childs
  const { type, message, statusCode, childs } = await childService.queryChilds(
    req
  );

  // 7) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 9) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message,
    childs
  });
});

/**
 * Delete Child
 * @param     {Object}  req
 * @param     {Object}  res
 * @returns   {JSON}
 */
export const deleteChild = catchAsync(async (req, res) => {
  const { id } = req.params;

  // 6) Get All Lost Childs
  const { type, message, statusCode } = await childService.deleteChild(id);

  // 7) Check If There is an Error
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 9) If Everything is OK, Send Data
  return res.status(statusCode).json({
    type,
    message
  });
});
