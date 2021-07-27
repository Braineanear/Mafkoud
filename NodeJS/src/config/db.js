// Packages
import mongoose from 'mongoose';

// Configs
import logger from './logger';
import config from './config';

/**
 * Connect To Database
 */
const connectDB = async () => {
  const DB = config.db.url.replace('<PASSWORD>', config.db.password);

  mongoose.set('autoIndex', true);

  // Connect to DB
  const con = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true
  });

  logger.info(`MongoDB Connected: ${con.connection.host}.`);

  // Connecting
  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to Database');
  });

  // Connected
  mongoose.connection.on('connected', () => {
    logger.info('Mongoose Connected to Database');
  });

  // Error
  mongoose.connection.on('error', (err) => {
    logger.error(err.message);
  });

  // Disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose Connection is Disconnected.');
  });

  // Exist
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

export default connectDB;
