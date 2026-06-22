function checkQueryHasParameters(req, res, parsedUrl) {
  if (
    !Object.hasOwn(parsedUrl.query, "todo") &&
    !Object.hasOwn(parsedUrl.query, "newtodo")
  ) {
    // res.end("missing parameters");
    return false;

  } else if (Object.hasOwn(parsedUrl.query, "todo")) {
      const todo = parsedUrl.query.todo
      if (typeof(todo)==="string") {
        return "todo"
      }
      // else {res.end('missing task: "if you want to get a specific todo, please provide the name of the Task \n in the given format http://localhost:3000/todos?todo={yourTask}"');
      else {
      return false }

  } else if (Object.hasOwn(parsedUrl.query, "newtodo")) {
    return "newtodo";
  }
}



module.exports = { checkQueryHasParameters};
