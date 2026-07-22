import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICON_DIR = path.join(__dirname, '../../public/images/icons');

const cache = new Map();

/**
 * Read an icon's markup from disk, caching it after the first read.
 * Returns '' when the icon is missing so a lost asset degrades to a blank
 * space rather than 500-ing the whole page.
 * @param {string} name
 * @returns {string}
 */
function loadIcon(name) {
  if (cache.has(name)) {
    return cache.get(name);
  }

  let svg = '';
  if (/^[a-z0-9-]+$/.test(name)) {
    try {
      svg = readFileSync(path.join(ICON_DIR, `${name}.svg`), 'utf8').trim();
    } catch {
      svg = '';
    }
  }

  cache.set(name, svg);
  return svg;
}

/**
 * Inline an icon from public/images/icons/<name>.svg.
 *
 * Icons are inlined rather than referenced via <use href="file.svg"> because
 * Firefox does not resolve cross-document <use> references, which silently
 * renders nothing. The file stays the single source of truth; its own root
 * attributes (viewBox, preserveAspectRatio, fill) are preserved as-is.
 *
 * @param {string} name - filename without extension, e.g. 'download'
 * @param {{ className?: string }} [options]
 * @returns {string} inline <svg> markup, or '' if the icon is missing
 */
export function icon(name, { className = '' } = {}) {
  const svg = loadIcon(name);
  if (!svg) return '';

  const attrs = ['aria-hidden="true"'];
  if (className) {
    attrs.unshift(`class="${className}"`);
  }

  return svg.replace(/^<svg\b/, `<svg ${attrs.join(' ')}`);
}

/** Test seam — drops the in-memory cache. */
export function clearIconCache() {
  cache.clear();
}
