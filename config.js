import 'dotenv/config';

export const config = {
  db: {
    supabaseConnectionString: process.env.SUPABASE_CONNECTION_STRING,
    maxConnections: 20,
    connectionTimeoutMillis: 2000,
    idleTimeoutMillis: 30000
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
    password: process.env.REDIS_PASSWORD
  },
  port: process.env.PORT || 3000
};

export default config;