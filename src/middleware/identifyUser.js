export function userIdValidation(queryId, objectUserId) {
  return queryId === objectUserId ? objectUserId : null;
}
