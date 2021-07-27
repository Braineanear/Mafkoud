// Utils
import catchAsync from '../utils/catchAsync';

// Services
import { cameraService } from '../services/index';

/**
 * Query All Camera Faces Controller
 * @param     {Object} req - Request object
 * @param     {Object} res - Response object
 * @returns   {JSON}
 */
const queryFaces = catchAsync(async (req, res) => {
  // 1) Get camera faces by calling camera service
  const { type, message, statusCode, faces } = await cameraService(req);

  // 2) Check if error occurred
  if (type === 'Error') {
    return res.status(statusCode).json({
      type,
      message
    });
  }

  // 3) If everything is OK, send data
  return res.status(statusCode).json({
    type,
    message,
    faces
  });
});

export default queryFaces;
