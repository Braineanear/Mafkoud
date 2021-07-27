// Utils
import catchAsync from '../utils/catchAsync';
import APIFeatures from '../utils/apiFeatures';

// Models
import { Camera } from '../models/index';

/**
 * Get All Faces From Database
 * @param   {Object} req
 * @returns {Object} {type, message, statusCode, faces}
 */
const queryFaces = catchAsync(async (req) => {
  // 1) Get all faces from database collection
  const faces = await APIFeatures(req, Camera);

  // 2) Check if there are no faces in the database collection
  if (faces.length === 0) {
    return {
      type: 'Error',
      message: 'No Faces Found',
      statusCode: 404
    };
  }

  // 3) If everything is OK, return faces
  return {
    type: 'Success',
    message: 'Faces Found Successfully',
    statusCode: 200,
    faces
  };
});

export default queryFaces;
