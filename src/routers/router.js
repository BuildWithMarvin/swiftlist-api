import { attachUserToRequest } from "../middleware/sessions.js";
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

  const method = req.method;
  const routeHandler = routes[method]?.[pathname];


  if (routeHandler) {
    await routeHandler(req, res, parsedUrl); 
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
}

export default routeRequest;
