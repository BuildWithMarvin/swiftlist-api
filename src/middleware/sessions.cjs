const { randomBytes } = require("crypto");
const dbRedis = require("../model/SessionModel");

function parseCookies(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return {};

  return Object.fromEntries(
    cookieHeader.split(";").map((part) => {
      const [name, ...rest] = part.split("=");
      return [name.trim(), rest.join("=").trim()];
    }),
  );
}

function getSessionId(req) {
  const cookieHeader = req.headers.cookie; 
  if (!cookieHeader) return null; 
  const cookies = parseCookies(req)
  return cookies["sessionId"] || null; // Nullish Coalescing ensures that only null/undefined values are caught

}

async function attachUserToRequest(req) {
  const sessionId = getSessionId(req);
  req.user = null;

  if (sessionId) {
    const sessionData = await dbRedis.findSession(sessionId);

    if (sessionData) {
      const currentAgent = req.headers["user-agent"] || "unknown";
        
      
      //TODO: Expand the logging system to store IP addresses and timestamps for security analysis
      // Protection against session hijacking: We compare the current browser with the one used at login
if (sessionData.userAgent === currentAgent) {
        req.user = sessionData;
      } else {
        console.warn(
          `Suspicious session access blocked. User-agent mismatch.`,
        );
      }
    }
  }
}

async function createSession(req, user) {
  const sessionId = randomBytes(32).toString("hex");

  // Fallback to ‘unknown’ so that JSON.stringify doesn't omit any fields when saving to the database
  const userAgent = req.headers["user-agent"] || "unknown";

  
  const sessionPayload = {
    userId: user.user_id,
    username: user.username,
    role: user.role, 
    userAgent: userAgent
  };

  
  await dbRedis.saveSession(sessionId, sessionPayload);

  return sessionId;
}



module.exports = {
  getSessionId,
  createSession,
  attachUserToRequest,
};
