import fs from ("fs");
import path from ("path");



function getInterfaces(req, res, parsedUrl) {
  switch (parsedUrl.path) {
    case "/login":
      const filename = path.join("src", "view", "login.html");
      fs.readFile(filename, "utf8", (error, data) => {
        if (error) {
          console.error("Datei-Lesefehler:", error);
          res.writeHead(500, { "content-type": "text/html" });
          res.end("<h1>500 - server-error</h1>");
        } else {
          res.writeHead(200, { "content-type": "text/html" });
          res.end(data);
        }
      });
      break;
    case "/ui":
      const filename1 = path.join("src", "view", "ui.html");
      fs.readFile(filename1, "utf8", (error, data) => {
        if (error) {
          console.error("File-Readerror:", error);
          res.writeHead(500, { "content-type": "text/html" });
          res.end("<h1>500 - Server-Fehler</h1>");
        } else {
          res.writeHead(200, { "content-type": "text/html" });
          res.end(data);
        }
      });
      break;
    case "/":
      res.end("welcome to Todolido");
      break;
    case "/todos":
      middleware.getListTodos(req, res, Session);
      break;
      case "/styles/styles.css":
      const cssPath = path.join("src", "view", "styles", "styles.css");
      fs.readFile(cssPath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("CSS not found");
          return;
        }
        res.setHeader("Content-Type", "text/css; charset=utf-8");
        res.end(data);
      });
      break;
    case "/styles/uiStyles.css":
      const cssPath1 = path.join("src", "view", "styles", "uiStyles.css");
      fs.readFile(cssPath1, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("CSS not found");
          return;
        }
        res.setHeader("Content-Type", "text/css; charset=utf-8");
        res.end(data);
      });
      break;
    case "/js/ui.js":
      const jsPath = path.join("src", "view", "js", "ui.js");
      fs.readFile(jsPath, (err, data) => {
        if (err) {
          res.statusCode = 404;
          res.end("CSS not found");
          return;
        }
        res.setHeader("Content-Type", "text/javascript; charset=utf-8");
        res.end(data);
      });
      break;
  }
}


module.exports = { getInterfaces };