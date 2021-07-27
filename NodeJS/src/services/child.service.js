// Packages
import moment from 'moment';

// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';
import dataUri from '../utils/datauri';
import { uploadFile } from '../utils/cloudinary';

// Models
import { Child } from '../models/index';

/**
 * Add Lost Child Service
 * @param   {Object} body - Lost Child Data
 * @param   {Object} image - Lost Child Image
 * @returns {Object} {type, message, statusCode, child}
 */
export const addLostChild = catchAsync(async (body, image, user) => {
  // 1) Extract data from body
  const { age, gender, name, lostDate } = body;

  // 2) Check if user entered data
  if (!age || !gender || !name || !lostDate) {
    return {
      type: 'Error',
      message: 'All Fields Are Required',
      statusCode: 400
    };
  }

  const date = moment(lostDate, 'HH:mm a');

  // 3) Specifiy Folder Name Where The Profile Image Is Going To Be Uploaded In Cloudinary
  const path = `Child/Lost/${date}`;
  const extension = 'jpg';

  // 4) Upload Image to Cloudinary
  const photo = await uploadFile(
    dataUri(image.buffer, extension).content,
    path,
    extension
  );

  // 5) Create lost child data
  const child = await Child.create({
    user: user._id,
    age,
    gender,
    name,
    lostDate: date,
    image: photo.secure_url,
    imageID: photo.public_id,
    status: 'lost'
  });

  // 6) If everything is OK, send data
  return {
    type: 'Success',
    message: 'Lost Child',
    statusCode: 201,
    child
  };
});

/**
 * Add Founded Child Service
 * @param   {Object} body - Founded Child Data
 * @param   {Object} image - Founded Child Image
 * @returns {Object} {type, message, statusCode, child}
 */
export const addFoundChild = catchAsync(async (body, image, user) => {
  // 1) Extract data from body
  const { age, gender, name } = body;

  // 2) Check if user entered data
  if (!age || !gender || !name || !image) {
    return {
      type: 'Error',
      message: 'All Fields Are Required',
      statusCode: 400
    };
  }

  // 3) Specifiy Folder Name Where The Profile Image Is Going To Be Uploaded In Cloudinary
  const path = `Child/Found/age:${age}-gender:${gender}-name:${name}`;
  const extension = 'jpg';

  // 4) Upload Image to Cloudinary
  const photo = await uploadFile(
    dataUri(image.buffer, extension).content,
    path,
    extension
  );

  // 4) Create founded child data
  const child = await Child.create({
    user: user._id,
    age,
    gender,
    name,
    image: photo.secure_url,
    imageID: photo.public_id,
    status: 'found'
  });

  // 6) If everything is OK, send data
  return {
    type: 'Success',
    message: 'Founded Child',
    statusCode: 201,
    child
  };
});

/**
 * Query Childs Service
 * @param {Object} req - request object
 * @returns {Object}
 */
export const queryChilds = catchAsync(async (req) => {
  // 1) Get all founded childs
  const childs = await APIFeatures(req, Child);

  // 2) Check if founded childs doesn't exist
  if (!childs) {
    return {
      type: 'Error',
      message: 'No Childs',
      statusCode: 404
    };
  }

  // 3) If everything is OK, send data
  return {
    type: 'Success',
    message: 'Childs',
    statusCode: 200,
    childs
  };
});

/**
 * Delete Child Using It's ID Service
 * @param   {ObjectID} id - Child ID
 * @returns {Object} {type, message, statusCode}
 */
export const deleteChild = catchAsync(async (id) => {
  // 1) Find child
  const child = await Child.findById(id);

  // 2) Check if child doesn't exist
  if (!child) {
    return {
      type: 'Error',
      message: `No Child With This ID: ${id}`,
      statusCode: 404
    };
  }

  // 4) Delete child
  await Child.findByIdAndDelete(id);

  // 5) If everything is OK, send message
  return {
    type: 'Success',
    message: 'Child Deleted Successfully',
    statusCode: 200
  };
});
