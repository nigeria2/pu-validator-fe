export function sanitizeString(string) {
  const sanitizedString = string.replace(/[^\w\s]|_| /gi, "");
  return sanitizedString?.toLowerCase();
}

export function sanitizeInputString(string) {
  if (typeof string !== 'string') return ""
  const sanitizedString = string.replace(/[^\d]|_| /gi, "");
  if (typeof sanitizedString !== 'string') return ""
  return sanitizedString
}
