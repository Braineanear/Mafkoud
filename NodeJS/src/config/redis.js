// Packages
import redis from 'redis';

// Configs
import config from './config';
import logger from './logger';

// Redis Port
const { url } = config.redis;

/**
 * Create Redis Client
 * @param {number} redisPort
 * @returns {Object}
 */
const client = redis.createClient(url);

// Redis Client Error Handler
client.on('error', (err) => {
  logger.error(`Redis Error: ${err}`);
});

export default client;
