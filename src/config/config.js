const fs = require("fs");
const path = require("path")

const configPath = path.join(__dirname, "../../config.json");

if (!fs.existsSync(configPath)) {
  console.error("FEHLER: config.json fehlt! Bitte config.example.json kopieren.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

module.exports=config;