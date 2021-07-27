// Packages
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

// Configs
import config from './config';
import tokenTypes from './tokens';
import { User } from '../models/index';

// Utils
import catchAsync from '../utils/catchAsync';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// Verifying JWT
const jwtVerify = catchAsync(async (payload, done) => {
  if (payload.type !== tokenTypes.ACCESS) {
    throw new Error('Invalid token type');
  }

  const user = await User.findById(payload.sub);

  if (!user) {
    return done(null, false);
  }
  done(null, user);
});

const jwtLogin = new JWTStrategy(jwtOptions, jwtVerify);

export default jwtLogin;
