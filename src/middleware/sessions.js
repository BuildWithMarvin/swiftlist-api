import { randomBytes } from "crypto";
import { findSession, saveSession } from "../model/SessionModel.js";

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

export function getSessionId(req) {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return null;
  const cookies = parseCookies(req);
  return cookies["sessionId"] || null; // Nullish Coalescing ensures that only null/undefined values are caught
}

export async function attachUserToRequest(req) {
  const sessionId = getSessionId(req);
  req.user = null;

  if (sessionId) {
    const sessionData = await findSession(sessionId);

    if (sessionData) {
      const currentAgent = req.headers["user-agent"] || "unknown";

      // Save IP addresses and timestamps in logs for better security.

      // Check User-Agent to prevent session hijacking. Must match the login state
      if (sessionData.userAgent === currentAgent) {
        req.user = sessionData;
      } else {
        console.warn(`Suspicious session access blocked. User-agent mismatch.`);
      }
    }
  }
}

export async function createSession(req, user) {
  const sessionId = randomBytes(32).toString("hex");

  // Fallback to ‘unknown’ so that JSON.stringify doesn't omit any fields when saving to the database
  const userAgent = req.headers["user-agent"] || "unknown";

  const sessionPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    userAgent: userAgent,
  };

  await saveSession(sessionId, sessionPayload);

  return sessionId;
}
