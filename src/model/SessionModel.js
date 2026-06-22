const redisClient = require("../config/redisClient");
const { session_ttl_seconds } = require("../config/sessionConfig");


async function saveSession(sessionID, payload) {


  await redisClient.set(`session:${sessionID}`, JSON.stringify(payload),{ EX: session_ttl_seconds });
}

async function findSession(sessionID)
{

   const value =  await redisClient.get(`session:${sessionID}`);
  if (!value) return null;

  // Verwandle den JSON-String wieder in ein lesbares Objekt
  return JSON.parse(value);
}

module.exports = {
  saveSession,
  findSession
}