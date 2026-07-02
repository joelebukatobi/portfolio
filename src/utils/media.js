/**
 * Normalize stored media paths to browser-ready URLs.
 * Paths may be stored as `public/uploads/...` or `/public/uploads/...`.
 */
export function toPublicMediaUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/')) return path;
  return `/${path}`;
}
