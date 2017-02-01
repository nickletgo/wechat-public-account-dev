import redis from 'redis';
import config from '../config/config';

const redisClient = (
  () => {
    let client;
    if (config.redisUrl) {
      client = redis.createClient(config.redisUrl);
    } else {
      client = redis.createClient();
    }
    client.on('connected', () => {
      console.log('redis client connected');
    });
    return client;
  }
)();

export default redisClient;
