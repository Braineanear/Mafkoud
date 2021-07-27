// Packages
import WebSocket from 'ws';
import cron from 'node-cron';
import moment from 'moment';

// Configs
import logger from './config/logger';
import connectDB from './config/db';
import config from './config/config';

// Models
import { Camera } from './models/index';

// App
import app from './app';

// Connect to MongoDB
connectDB();

// Cron Job => Delete camera collection every 24 hour
cron.schedule('0 0 0 * * *', async () => {
  logger.log('---------------------');
  logger.log('Running Cron Job');

  await Camera.deleteMany({});

  logger.log('Camera Collection Deleted');
});

const { port } = config.server;

const server = app.listen(port, () => {
  logger.info(`
      ################################################
      🚀 Server listening on port: ${port} 🚀
      ################################################
  `);
});

// Initialize Web Socket Connection
const address = 'ws://python:5432';
const ws = new WebSocket(address);

// On receiving camera image and it's details from python script
ws.on('message', async (image, imageID, age, gender, location, date) => {
  await Camera.create({
    image,
    imageID,
    age,
    gender,
    location,
    date: moment(date, 'HH:mm a')
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
