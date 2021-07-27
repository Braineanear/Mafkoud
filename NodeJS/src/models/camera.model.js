// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/toJSON.plugin';

const cameraSchema = mongoose.Schema({
  age: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imageID: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

// Enable Plugin
cameraSchema.plugin(toJSON);

/**
 * @typedef Camera
 */
const Camera = mongoose.model('Camera', cameraSchema);

export default Camera;
