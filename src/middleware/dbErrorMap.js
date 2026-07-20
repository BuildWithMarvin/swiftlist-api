export const dbErrorMap = {
  ER_BAD_NULL_ERROR: {
    message: "Required fields are missing.",
    statusCode: 400,
  },
  ER_DATA_TOO_LONG: {
    message: "Title or description is too long.",
    statusCode: 400,
  },
  ER_NO_REFERENCED_ROW_2: { message: "User does not exist.", statusCode: 400 },
  ER_DUP_ENTRY: { message: "This entry already exists.", statusCode: 409 },
};

export function handleDbError(err) {
  console.error("Db-errorcode:", err.code, "| Original Message:", err.message);

  const mappedError = dbErrorMap[err.code];
  const errorMessage = mappedError
    ? mappedError.message
    : "The service is temporarily unavailable.";
  const statusCode = mappedError ? mappedError.statusCode : 500;

  const dbError = new Error(errorMessage);
  dbError.statusCode = statusCode;

  return dbError;
}
