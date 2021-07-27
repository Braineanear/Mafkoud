// Packages
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';

// Configs
import jwtLogin from './config/passport';
import config from './config/config';
import { successHandle, errorHandle } from './config/morgan';

// Middlewares
import limiter from './middlewares/rateLimiter';

// Utils
import errorHandler from './utils/errorHandler';
import AppError from './utils/appError';

// Routes
import routes from './routes/index';

const app = express();

app.enable('trust proxy');

// Morgan Handler
app.use(successHandle);
app.use(errorHandle);

// Set security HTTP headers
app.use(helmet());

// Set Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//Data sanitization against XSS
app.use(xss());

// Implement CORS
app.use(cors());
app.options('*', cors());

app.use(compression());

app.disable('x-powered-by');

// JWT Authentication
app.use(passport.initialize());
passport.use(jwtLogin);

// Limit Repeated Failed Requests to Auth Endpoints
if (config.env === 'production') {
  app.use('/api', limiter);
}

// API Routes
app.use('/api', routes);

// When someone access route that does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error Handler
app.use(errorHandler);

/**
 * Exports Express
 * @public
 */
export default app;
