import { stringify as uuidStringify } from "uuid";

export function bytesToUUID(result) {

result.forEach((element) =>
    Object.keys(element).forEach((key) => {
      if (key == "id") {
        const todoID = uuidStringify(element[key]);
        element.id = todoID;
        element.user_id = uuidStringify(element.user_id);
      }
    }),
  );    

return result;
}