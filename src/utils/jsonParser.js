
 export function parseJSONSafely(str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    console.error("Invalid JSON:", err.message);
    return null;
  }
}

