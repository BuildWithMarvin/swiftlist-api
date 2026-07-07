import { showLoginPage, showDashboard } from "../controller/pageCtrl.js";
import { showDesign, showHover, sendScript } from "../controller/assetCtrl.js";
import { prcsLogin } from "../controller/authCtrl.js";
import { createEntry, showTodos, showTodo } from "../controller/todoCtrl.js";

export async function handlePaths(path, req, res, parsedUrl) {
  const method = req.method;

  if (method == "GET") {
    handleGetRoutes(req, res, path, parsedUrl);
  }
  if (method == "POST") {
    handlePostRoutes(req, res, path);
  }
}

export async function handleGetRoutes(req, res, path, parsedUrl) {
   const id = parsedUrl.query.id;
      const title = parsedUrl.query.title;
  switch (path) {
    case "/login":
      return showLoginPage(res);
    case "/styles/output.css":
      return showDesign(res);
    case "/styles/hover.css":
      return showHover(res);
    case "/register":
      return showRegister(req, res);
    case "/dashboard":
      return showDashboard(res);
    case "/js/login.js":
      return sendScript(res);
    case "/todos":
      return showTodos(res, id);
    case "/todo":
      return showTodo(res, id, title);
    default:
      res.writeHead(404);
      res.end("Page not found");
  }
}

export async function handlePostRoutes(req, res, path) {
  switch (path) {
    case "/entry":
      return createEntry(req, res);
    case "/validate":
      return prcsLogin(req, res);
    case "/register":
      return showRegister(req, res);
    default:
      res.writeHead(404);
      res.end("Page not found");
  }
}
