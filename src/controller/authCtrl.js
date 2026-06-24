import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import queryString from "query-string";
import { getUserForLogin } from "../model/dbModel.js";
import { createSession } from "../middleware/sessions.js";
import { setDefaultHighWaterMark } from "stream";
import { session_ttl_seconds } from "../config/sessionConfig.js"; 

export async function prcsLogin(req, res) {
  try {
    console.log("Test");
    const data = await collectRequestData(req);
    const username = data?.username;
    const password = data?.password;

    if (!username || !password) {
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

    const cookie = await createSession(req, user);

    res.writeHead(301, {
      Location: "/dashboard",
      "Set-Cookie": `sessionId=${cookie}; Max-Age=${session_ttl_seconds}; HttpOnly; SameSite=Lax; Path=/`,
    });
    res.end();
    return;
  } catch (error) {
    console.error("Login Request Error:", error.message);

    if (error.message === "Request timeout") {
      res.writeHead(408, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "The request timed out. Please refresh the page and try again.",
      );
    }

    if (error.message === "Payload too large") {
      res.writeHead(413, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("The data being sent is too large");
    }

    if (error.message === "PARSE_ERROR") {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end(
        "The form data submitted could not be processed.",
      );
    }

    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(
      "Ein interner Serverfehler ist aufgetreten. Bitte später erneut versuchen.",
    );
  }
}

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
          resolve(queryString.parse(body));
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
