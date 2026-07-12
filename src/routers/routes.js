import { showLoginPage, showDashboard } from "../controller/pageCtrl.js";
import { showDesign, showHover, sendScript } from "../controller/assetCtrl.js";
import { prcsLogin } from "../controller/authCtrl.js";
import { createEntry, showTodos, showTodo } from "../controller/todoCtrl.js";
import { registerUser } from "../controller/registerCtrl.js";



export const routes = {
  'GET': {
    '/login':(req, res, parsedUrl) => showLoginPage(req, res, parsedUrl),
    '/dashboard':(req, res, parsedUrl) => showDashboard(req, res, parsedUrl),
    '/todos': (req, res) => showTodos(req, res),
    '/todo': (req, res, parsedUrl) => showTodo(req, res, parsedUrl.query.id),
    '/styles/output.css':(req, res) => showDesign(req, res),
    '/js/login.js': (req, res) => sendScript (req, res)
},
  'POST': {
    '/entry': (req, res, parsedUrl) => createEntry(req, res, parsedUrl),
    '/validate': (req, res) => prcsLogin(req, res),
    '/register': (req, res) => registerUser(req, res)
  }
};







