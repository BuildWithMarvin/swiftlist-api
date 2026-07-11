import { createTodo, getTodos, getTodo } from "../model/dbModel.js";
import { collectRequestData } from "../utils/requestParser.js";
import { v7 as uuidv7 } from "uuid";
import { userIdValidation } from "../middleware/identifyUser.js";
import { bytesToUUID } from "../utils/uuidFromBytes.js";

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
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(todoID);
  return;
}

export async function showTodos(req, res, id) {
  const UserId = userIdValidation(id, req.user.userId);

  if (!UserId) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("not found");
    return;
  }

  const result = await getTodos(UserId);

  const todos = JSON.stringify(bytesToUUID(result));

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}

export async function showTodo(req, res, id, title) {
  const result = await getTodo(id, title);

  const todos = JSON.stringify(bytesToUUID(result));

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}
