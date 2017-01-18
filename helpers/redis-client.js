import redis from 'redis';

const redisClient = (
  function createClient() {
    const client = redis.createClient();
    client.on('connected', () => {
      console.log('redis client connected');
    });
    return client;
  }()
);

export default redisClient;
