// Packages
import mongoose from 'mongoose';

// Plugins
import toJSON from './plugins/index';

// Configs
import tokenTypes from '../config/tokens';

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: [
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.VERIFY_EMAIL
      ],
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Enable Plugins
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema);

export default Token;
