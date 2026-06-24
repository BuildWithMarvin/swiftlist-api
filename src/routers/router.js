import {attachUserToRequest} from "../middleware/sessions.js";
import {handlePaths, handleGetRoutes, handlePostRoutes} from "./routes.js"


/*
  TODO: Automate static file handling (images, CSS) to separate 
  asset delivery from core application routing logic as the app scales.
 */
const PUBLIC_ROUTES = ["/login", "/register", "/validate"]; 

async function routeRequest(req, res, parsedUrl) {
  
  //comment out for tests without a session
  await attachUserToRequest(req); 

  const pathname = parsedUrl.pathname;

const isPublicRoute = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/styles/');


  if (!req.user && !isPublicRoute) {
    res.writeHead(302, { Location: "/login" });
    return res.end();
  }

  handlePaths(pathname, req, res);
}

export default routeRequest;
