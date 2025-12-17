export function julianToUTC(jd: number): string {
  // Convert Julian Day to Unix timestamp (milliseconds)
  const unixMs = (jd - 2440587.5) * 86400000;
  const date = new Date(unixMs);
  return date.toISOString().replace("T", " ").slice(0, 19) + " UTC";
}