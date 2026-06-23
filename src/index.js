import app from './app.js';
import redisClient from './config/redisClient.js';
import { testDatabaseConnection } from"./config/db.js";
import config from '../config.json' with { type: 'json' };


async function startApplication() {
  await redisClient.connect();

  await testDatabaseConnection();

  const PORT = config.PORT || 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server runs on ${PORT}`);
  });
}

startApplication();
// TODO: When shutting down the server, let open HTTP requests time out
// and cleanly close all MySQL and Redis database connections.