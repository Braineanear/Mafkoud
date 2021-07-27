// Utils
import catchAsync from '../utils/catchAsync';

// Models
import { Camera, Child, User } from '../models/index';

/**
 * Matching two images service
 * @return    {Object}
 */
export const match = catchAsync(async () => {
  // 1) Get all lost children from database
  const childs = await Child.find({ status: 'lost' });

  // 2) Check if there is no children
  if (!childs) {
    return {
      type: 'Error',
      message: 'No Childs Found',
      statusCode: 404
    };
  }

  const data = [];
  const childLength = childs.length;

  for (let i = 0; i < childLength; i += 1) {
    // 3) Get all faces that it's gender = child gender
    //  child age + 5 > face age > child age - 5
    //  face date > child lost date
    const faces = await Camera.find({
      gender: childs[i].gender,
      age: { $lte: childs[i].age + 5, $gte: childs[i].age - 5 },
      date: { $gte: childs[i].lostDate}
    }).select('image location date').sort({'date': 'desc'});

    // 4) Check if there is no faces
    if (!faces) {
      return {
        type: 'Error',
        message: 'No Faces Found',
        statusCode: 404
      };
    }

    // 5) Push child data and faces into the array
    data.push([childs[i], faces]);
  }

  // 6) If everything is OK, send data
  return {
    type: 'Success',
    message: 'Match Data',
    statusCode: 200,
    data
  };
});

/**
 * Matching result service
 * @param     {Object} body
 * @return    {Object}
 */
export const matchResult = catchAsync(async (body) => {
  const { childID, location } = body;

  // 1) Find child document using it's id
  const child = await Child.findById(childID);

  // 2) Check if there is no child
  if (!child) {
    return {
      type: 'Error',
      message: `No child found with this id: ${childID}`,
      statusCode: 404
    };
  }

  // 3) Find user document using it's id
  const user = await User.findById(child.user);

  // 4) Check if there is no user
  if (!user) {
    return {
      type: 'Error',
      message: `No user found with this id: ${child.user}`,
      statusCode: 404
    };
  }

  await Child.findByIdAndDelete(childID);

  // 5) If everything is OK, send data
  return {
    type: 'Success',
    message: 'Matched',
    statusCode: 200,
    location,
    user
  };
});
