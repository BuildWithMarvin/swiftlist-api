import {showLoginPage, showDashboard} from "../controll/pageCtrl.js"
import {showDesign, showHover} from "../controll/assetCtrl.js"
import {prcsLogin} from "../controll/authCtrl.js"


export async function handlePaths(path, req, res)
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

export async function handleGetRoutes(req, res, path) {
    switch (path) {
    case "/login":   return showLoginPage(res);
    case "/styles/output.css" : return showDesign(res);
     case "/styles/hover.css" : return showHover(res);
    case "/register":  return showRegister(req, res);
    case "/dashboard": return showDashboard(res);
    default:
      res.writeHead(404);
      res.end("Seite nicht gefunden");
  }
}

export async function handlePostRoutes(req, res, path) {
    switch (path) {
    case "/validate":     return prcsLogin(req, res);
    case "/register":  return showRegister(req, res);
    default:
      res.writeHead(404);
      res.end("Seite nicht gefunden");
  }
}


