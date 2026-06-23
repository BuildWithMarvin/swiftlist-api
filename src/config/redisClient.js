import { createClient } from 'redis';
import config from '../../config.json' with { type: 'json' };


const redisClient = createClient({
  url: config.redis.url,
  password: config.redis.password 
});


redisClient.on('error', (err) => console.error('Redis Client Error', err));


export default redisClient;