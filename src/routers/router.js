import {attachUserToRequest} from "../middleware/sessions.js";
import {handlePaths, handleGetRoutes, handlePostRoutes} from "./routes.js"


// TODO: currently, stylesheets and public paths are listed here manually. 
// As the number of pages increases, this becomes confusing - we need an automated 
// solution that handles static files (images, CSS) separately from the app logic.
const PUBLIC_ROUTES = ["/login", "/register", "/validate"]; // TODO : find a solution for the stylesheets , there shouldn't be an entry for every one of them

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
