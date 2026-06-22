const authCtrl = require("../controll/authCtrl");
const pageCtrl = require("../controll/pageCtrl");
const assetCtrl = require("../controll/assetCtrl");

async function handlePaths(path, req, res)
{
     method = req.method;

    if(method == "GET")
     {
        handleGetRoutes(req, res, path);
     }
     if(method == "POST")
     {
        handlePostRoutes(req, res, path)
     }

}

async function handleGetRoutes(req, res, path) {
    switch (path) {
    case "/login":   return pageCtrl.showLoginPage(res);
    case "/styles/output.css" : return assetCtrl.showDesign(res);
     case "/styles/hover.css" : return authCtrl.showHover(res);
    case "/register":  return authCtrl.showRegister(req, res);
    case "/dashboard": return pageCtrl.showDashboard(res);
    case "/settings":  return userCtrl.getSettings(req, res);
    // case "/validate":  return userCtrl.EmailVerifyController(req, res);
    default:
      res.writeHead(404);
      res.end("Seite nicht gefunden");
  }
}

async function handlePostRoutes(req, res, path) {

    switch (path) {
    case "/validate":     return authCtrl.prcsLogin(req, res);
    case "/register":  return authCtrl.showRegister(req, res);
    // case "/dashboard": return userCtrl.showDashboard(req, res);
    case "/settings":  return userCtrl.getSettings(req, res);
    default:
      res.writeHead(404);
      res.end("Seite nicht gefunden");
  }
}


module.exports = { handlePaths };