import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { stringify as uuidStringify } from "uuid";
import { getUserForLogin } from "../model/dbModel.js";
import { createSession } from "../middleware/sessions.js";
import { session_ttl_seconds } from "../config/sessionConfig.js";
import { collectRequestData } from "../utils/requestParser.js";

export async function prcsLogin(req, res) {
  try {
    const rawdata = await collectRequestData(req);
    const data = await JSON.parse(rawdata);
    const username = data?.username;
    const password = data?.password;

    const user = await getUserForLogin(username);

 const match = user ? await bcrypt.compare(password, user.password) : false;
    if (!match) {
      res.writeHead(401, { "content-type": "text/html" });
      res.end("unauthorized");
      return;
    }

    const testID = await uuidStringify(user.id);

    user.id = testID;
    const cookie = await createSession(req, user);

    res.writeHead(200, {
      "Content-Type": "text/plain",
      "Set-Cookie": `sessionId=${cookie}; Max-Age=${session_ttl_seconds}; HttpOnly; SameSite=Lax; Path=/`,
    });
    res.end("login successful");
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
      return res.end("The form data submitted could not be processed.");
    }

     res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(
      "Ein interner Serverfehler ist aufgetreten. Bitte später erneut versuchen.",
    );
  }
}
