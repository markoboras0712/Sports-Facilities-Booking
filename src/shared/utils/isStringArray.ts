/* eslint-disable @typescript-eslint/no-explicit-any */
export function isStringArray(data: any): data is string[] {
  if (!data) return false;
  return typeof data[0] === 'string';
}
