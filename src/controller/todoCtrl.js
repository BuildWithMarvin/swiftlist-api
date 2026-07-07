import { createTodo, getTodos, getTodo } from "../model/dbModel.js";
import { collectRequestData } from "../utils/requestParser.js";
import { v7 as uuidv7 } from "uuid";
import { stringify as uuidStringify } from "uuid";

export async function createEntry(req, res) {
  const rawdata = await collectRequestData(req);
  const data = await JSON.parse(rawdata);
  
  const entry = {
  id: uuidv7(),
  user_id: req.user.userId,
  is_done: 0,
  title: data?.title,
  description: data?.description,
};

  if (!entry.title) {
    res.writeHead(422, { "content-type": "text/html" });
    res.end("missing parameters");
    return;
  }

  const insert = await createTodo(entry);

  const todoID = JSON.stringify(entry.id);
  res.writeHead(201, {
    "Content-Type": "text/plain",
  });
  res.end(todoID);
  return;
}

// TODO: Secure endpoint – currently, any logged-in user can access entries by ID.
<<<<<<< HEAD

export async function showTodos(req, res, id) {
  const result = await getTodos(id);

  // NOTE: Current JSON structure might need optimization for frontend iteration
  // TODO: factor out to 'utils'
  result.forEach((element) =>
    Object.keys(element).forEach((key) => {
      
      if (key == "id") {
        const todoID = uuidStringify(element[key]);
        element.id = todoID;
        element.user_id = uuidStringify(element.user_id);
      }
    }),
  );
  const todos = JSON.stringify(result);

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}


export async function showTodo(req,res, id, title) {
  const result = await getTodo(id, title);

  result.forEach((element) =>
    Object.keys(element).forEach((key) => {
      
=======
export async function showTodos(res, id) {
  const result = await getTodos(id);

  //TODO: Review if current JSON structure is optimal for frontend iteration

  result.forEach((element) =>
    Object.keys(element).forEach((key) => {
     
>>>>>>> bf12a52d48db8a90c58dd0a010c343debfea104e
      if (key == "id") {
        const todoID = uuidStringify(element[key]);
        element.id = todoID;
        element.user_id = uuidStringify(element.user_id);
      }
    }),
  );
  const todos = JSON.stringify(result);

  res.writeHead(201, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}



