import fs from "fs";
import path from "path";

export function showDesign(res) {
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

