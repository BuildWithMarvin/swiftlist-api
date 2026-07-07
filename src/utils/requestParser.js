export function collectRequestData(request) {
  const MAX_SIZE = 16 * 1024;

  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    request.on("data", (chunk) => {
      if (size + chunk.length > MAX_SIZE) {
        reject(new Error("Payload too large"));
        request.destroy();
        return;
      }
      size += chunk.length;
      body += chunk.toString();
    });

    request.on("end", () => {
      try {
        resolve(body);
      } catch (err) {
        reject(new Error(err));
      }
    });

    request.on("error", (err) => reject(err));
  });
}