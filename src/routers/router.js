const middleware = require("../middleware/sessions.cjs");
const routes = require("./routes");


// TODO: currently, stylesheets and public paths are listed here manually. 
// As the number of pages increases, this becomes confusing - we need an automated 
// solution that handles static files (images, CSS) separately from the app logic.
const PUBLIC_ROUTES = ["/login", "/register", "/validate"]; // TODO : find a solution for the stylesheets , there shouldn't be an entry for every one of them

async function routeRequest(req, res, parsedUrl) {
  
  //comment out for tests without a session
  await middleware.attachUserToRequest(req); 

  const pathname = parsedUrl.pathname;

const isPublicRoute = PUBLIC_ROUTES.includes(pathname) || pathname.startsWith('/styles/');


  if (!req.user && !isPublicRoute) {
    res.writeHead(302, { Location: "/login" });
    return res.end();
  }

routes.handlePaths(pathname, req, res);
}
module.exports = { routeRequest };