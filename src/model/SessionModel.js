import redisClient from "../config/redisClient.js";
import session_ttl_seconds from "../config/sessionConfig.js"


export async function saveSession(sessionID, payload) {


  await redisClient.set(`session:${sessionID}`, JSON.stringify(payload),{ EX: session_ttl_seconds });
}

export async function findSession(sessionID)
{

   const value =  await redisClient.get(`session:${sessionID}`);
  if (!value) return null;

  // Verwandle den JSON-String wieder in ein lesbares Objekt
  return JSON.parse(value);
}

