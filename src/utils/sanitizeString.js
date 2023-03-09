export function sanitizeString(string) {
  const sanitizedString = string.replace(/[^\w\s]|_| /gi, "");
  return sanitizedString?.toLowerCase();
}
