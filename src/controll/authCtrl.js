import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import parse from "querystring";
import {getUserForLogin} from "../model/dbModel.js";
import {createSession} from '../middleware/sessions.js'; // Falls sessions.js ein "export default" nutzt
import { setDefaultHighWaterMark } from 'stream';
import { session_ttl_seconds } from '../config/sessionConfig.js'; // Mit .js Endung!

export async function prcsLogin(req, res) {
  try {
    const data = await collectRequestData(req);
    const username = data?.username;
    const password = data?.password;

    if (
      !username ||
      !password
    ) // perhabs unnecessary as there is already a rescriction on empty inputs
    {
      res.writeHead(401, { "content-type": "text/html" }); //check the righ status code for that cause
      res.end("username and password are required");
      return;
    }
    const user = await getUserForLogin(username);

    const match = user ? await bcrypt.compare(password, user.password) : false;
    if (!match) {
      res.writeHead(401, { "content-type": "text/html" });
      res.end("unauthorized");
      return;
    }

    const cookie = await middleware.createSession(req, user);

    res.writeHead(301, {
      Location: "/dashboard",
      "Set-Cookie": `sessionId=${cookie}; Max-Age=${session_ttl_seconds}; HttpOnly; SameSite=Lax; Path=/`,
    });
    res.end();
    return;
  } catch (error) {
    console.error("Login Request Error:", error.message);

    // 1. Fall: Zeitüberschreitung (Der Watchdog hat zugeschlagen)
    if (error.message === "Request timeout") {
      // Status 408 steht offiziell für "Request Timeout"
      res.writeHead(408, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "Zeitüberschreitung bei der Anfrage. Bitte lade die Seite neu und versuche es noch einmal.",
      );
    }

    // 2. Fall: Jemand hat versucht, riesige Datenmengen zu schicken
    if (error.message === "Payload too large") {
      // Status 413 steht für "Payload Too Large"
      res.writeHead(413, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Die gesendeten Daten sind zu groß.");
    }

    if (error.message === "PARSE_ERROR") {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "Die gesendeten Formulardaten konnten nicht verarbeitet werden.",
      );
    }

    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(
      "Ein interner Serverfehler ist aufgetreten. Bitte später erneut versuchen.",
    );
  }
}

// export async function prcsLogin(req, res) {
//   console.log("Test-Export funktioniert!");
// }

function collectRequestData(request) {
  const FORM_URLENCODED = "application/x-www-form-urlencoded";
  const MAX_SIZE = 16 * 1024;

  return new Promise((resolve, reject) => {
    if (request.headers["content-type"] === FORM_URLENCODED) {
      let body = "";
      let size = 0;

      request.on("data", (chunk) => {
        if (size + chunk.length > MAX_SIZE) {
          reject(new Error("Payload too large"));
          request.destroy();
          return;
        }
        size += chunk.length;
        body += chunk.toString();
      });

      request.on("end", () => {
        try {
          resolve(parse(body));
        } catch (err) {
          reject(new Error(err));
        }
      });

      request.on("error", (err) => reject(err));
    } else {
      resolve(null);
    }
  });
}


