import { attachUserToRequest } from "../middleware/sessions.js";
// import { handlePaths, handleGetRoutes, handlePostRoutes } from "./routes.js";
import { routes } from './routes.js';
/*
  TODO: Automate static file handling (images, CSS) to separate 
  asset delivery from core application routing logic as the app scales.
 */
const PUBLIC_ROUTES = ["/login", "/register", "/validate"];

async function routeRequest(req, res, parsedUrl) {
  //comment out for tests without a session
  await attachUserToRequest(req);

  const pathname = parsedUrl.pathname;

  const isPublicRoute =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname.startsWith("/styles/") ||
    pathname.startsWith("/styles/") ||
    pathname.startsWith("/js/");

  if (!req.user && !isPublicRoute) {
    res.writeHead(302, { Location: "/login" });
    return res.end();
  }

<<<<<<< HEAD
  const method = req.method;
  const routeHandler = routes[method]?.[pathname];


  if (routeHandler) {
    routeHandler(req, res, parsedUrl); 
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
=======
  handlePaths(pathname, req, res, parsedUrl); // TODO: Refactor to pass 'parsedUrl' object instead of 'pathname' for better extensibility?
>>>>>>> bf12a52d48db8a90c58dd0a010c343debfea104e
}

export default routeRequest;
