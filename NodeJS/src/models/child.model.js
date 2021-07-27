// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/toJSON.plugin';

const childSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  name: {
    type: String,
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
  status: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  lostDate: {
    type: Date
  }
});

// Enable Plugin
childSchema.plugin(toJSON);

/**
 * @typedef Child
 */
const Child = mongoose.model('Child', childSchema);

export default Child;
