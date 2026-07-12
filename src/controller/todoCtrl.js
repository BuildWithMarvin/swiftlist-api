import { createTodo, getTodos, getTodo } from "../model/dbModel.js";
import { collectRequestData } from "../utils/requestParser.js";
import { v7 as uuidv7 } from "uuid";
import { bytesToUUID } from "../utils/uuidFromBytes.js";

export async function createEntry(req, res, parsedUrl) {
  const rawdata = await collectRequestData(req);
  const data = await JSON.parse(rawdata);

  const entry = {
    id: uuidv7(),
    user_id: req.user.id,
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

  const entryID = JSON.stringify(entry.id);
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(entryID);
  return;
}

export async function showTodos(req, res) {

    const userId = req.user.id;


  if (!userId) {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("not found");
    return;
  }

  const result = await getTodos(userId);

  const todos = JSON.stringify(bytesToUUID(result));

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}

export async function showTodo(req, res, id) {
  const result = await getTodo();

  const todos = JSON.stringify(bytesToUUID(result));

  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(todos);
  return;
}
