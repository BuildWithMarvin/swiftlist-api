import { createTodo, getTodos, getTodo } from "../model/dbModel.js";
import { collectRequestData } from "../utils/requestParser.js";
import { v7 as uuidv7 } from "uuid";
import { stringify as uuidStringify } from "uuid";
// uuidv7 generation new
export async function createEntry(req, res) {
  const rawdata = await collectRequestData(req);
  const data = await JSON.parse(rawdata);
  const entry = {};
  entry.id = uuidv7();
  entry.user_id = req.user.userId;
  entry.title = data?.title;
  entry.is_done = 0;
  entry.description = data?.description;

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

// not secure enough logged in user can access everyone else entry by knowing the id. TODO: implement a more secure solution
// new ! dont forget to mention the buffer converting back in uuid string 
export async function showTodos(res, id) {
  const result = await getTodos(id);

  //TODO: Perhaps consider a different JSON structure for iteration in the frontend
  // const convertedResults = {};
  result.forEach((element) =>
    Object.keys(element).forEach((key) => {
      // console.log(`${key}1: ${element[key]}`);
      if (key == "id") {
        const todoID = uuidStringify(element[key]);
        element.id = todoID;
        element.user_id = uuidStringify(element.user_id);
      }
    }),
  );
  const todos = JSON.stringify(result);

  res.writeHead(201, {
    "Content-Type": "text/plain",
  });
  res.end(todos);
  return;
}

export async function showTodo(res, id, title) {
  const result = await getTodo(id, title);

  const todos = JSON.stringify(result);

  res.writeHead(201, {
    "Content-Type": "text/plain",
  });
  res.end(todos);
  return;
}



