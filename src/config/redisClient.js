import { createClient } from 'redis';
import config from '../../config.js'

if (!config.redis.host || !config.redis.password) {
  console.error("FEHLER: REDIS_HOST oder REDIS_PASSWORD wurden nicht geladen! Prüfe deine .env");
}

const redisClient = createClient({
  socket: {
    host: config.redis.host,
    port: config.redis.port,
    tls: true
  },
  username: 'default',
  password: config.redis.password
});


redisClient.on('error', (err) => console.error('Redis Client Error', err));


export default redisClient;