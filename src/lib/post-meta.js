/**
 * Blog post display helpers for the public site.
 */

/**
 * @param {object} [post]
 * @returns {string}
 */
export function getPostAuthorName(post) {
  const user = post?.user;
  if (!user) return 'Unknown';

  const first = user.first_name || user.firstName || '';
  const last = user.last_name || user.lastName || '';
  const full = `${first} ${last}`.trim();

  return full || user.username || user.email?.split('@')[0] || 'Unknown';
}

/**
 * @param {object} [post]
 * @returns {string|null} ISO date string
 */
export function getPostPublishedAt(post) {
  return post?.published_at || post?.created_at || null;
}

/**
 * Strip HTML and estimate reading time in minutes.
 * @param {string} html
 * @param {number} [wordsPerMinute=200]
 * @returns {number}
 */
export function estimateReadingMinutes(html, wordsPerMinute = 200) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return 1;

  const words = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * @param {number} minutes
 * @returns {string}
 */
export function formatReadingTime(minutes) {
  const count = Math.max(1, Math.round(minutes));
  return count === 1 ? '1 Minute Read' : `${count} Minutes Read`;
}
