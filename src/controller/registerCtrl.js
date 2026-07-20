import bcrypt from "bcrypt";
import { createUser } from "../model/dbModel.js";
import { collectRequestData } from "../utils/requestParser.js";
import { v7 as uuidv7 } from "uuid";
import {parseJSONSafely} from "../utils/jsonParser.js"

export async function registerUser(req, res, parsedUrl) {
  const rawdata = await collectRequestData(req);
  const data = await parseJSONSafely(rawdata);
  /*Todo : error handling - check first if data is null and then if properties exists.
   wrong formated json throws an exception in collectRequestData or in parseJSONsafely if not testable via pman test by curl
  */
  
   if (!data.password || !data.username ) {
    res.writeHead(422, { "content-type": "text/html" });
    res.end("missing parameters");
    return;
  }

  const user = {
    id: uuidv7(data.id),
    username: data.username,
    password: "",
    email: data.email,
    role: data.role
  };

user.password = await bcrypt.hash(data.password, 12);

  const insert = await createUser(user);

  const userJSON = JSON.stringify(insert);
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });
  res.end(userJSON);
  return;
}