const fs = require("fs");
const path = require("path");


function showLoginPage(res) {
  const filename = path.join("src", "view", "login.html");
  fs.readFile(filename, "utf8", (error, data) => {
    if (error) {
      console.error("Datei-Lesefehler:", error);
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>500 - Server-Fehler</h1>");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
}

function showDashboard(res) {
  const filename = path.join("src", "view", "dashboard.html");
  fs.readFile(filename, "utf8", (error, data) => {
    if (error) {
      console.error("Datei-Lesefehler:", error);
      res.writeHead(500, { "content-type": "text/html" });
      res.end("<h1>500 - Server-Fehler</h1>");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
}

module.exports={
    showLoginPage,
    showDashboard
}