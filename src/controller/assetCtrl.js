import fs from "fs";
import path from "path";

export function showDesign(req, res, parsedUrl) {
  const filename = path.join("src", "view", "styles", "output.css");
  fs.readFile(filename, "utf8", (error, data) => {
    if (error) {
      console.error("File read error:", error);
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>500 - Server-Fehler</h1>");
    } else {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
      res.end(data);
    }
  });
}

export function sendScript(req, res) {
  const filename = path.join("src", "view", "js", "login.js");
  fs.readFile(filename, "utf8", (error, data) => {
    if (error) {
      console.error("File read error:", error);
      res.writeHead(500, { "content-type": "text/plain;charset=utf-8" });
      res.end("Server-Fehler: Die JS-Datei wurde nicht gefunden!");
    } else {
      res.setHeader("Content-Type", "text/javascript; charset=utf-8");
      res.end(data);
    }
  });
}

export function showHover(res) {
  const filename = path.join("src", "view", "styles", "hover.css");
  fs.readFile(filename, "utf8", (error, data) => {
    if (error) {
      console.error("Datei-Lesefehler:", error);
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>500 - Server-Fehler</h1>");
    } else {
      res.setHeader("Content-Type", "text/css; charset=utf-8");
      res.end(data);
    }
  });
}

