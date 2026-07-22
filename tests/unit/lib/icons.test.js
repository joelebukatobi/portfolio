import { describe, it, expect } from 'vitest';
import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { icon } from '../../../src/lib/icons.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICON_DIR = path.join(__dirname, '../../../public/images/icons');

describe('icon', () => {
  it('inlines the svg markup for a known icon', () => {
    const result = icon('download');
    expect(result).toContain('<svg');
    expect(result).toContain('</svg>');
    expect(result).toContain('<path');
  });

  it('never emits a cross-document <use> reference', () => {
    expect(icon('download')).not.toContain('<use');
  });

  it('preserves the source file viewBox', () => {
    expect(icon('close')).toContain('viewBox="0 0 25 25"');
    expect(icon('download')).toContain('viewBox="0 0 24 24"');
  });

  it('adds aria-hidden', () => {
    expect(icon('download')).toContain('aria-hidden="true"');
  });

  it('applies a className when given', () => {
    expect(icon('moon', { className: 'navbar__theme-icon--moon' })).toContain(
      'class="navbar__theme-icon--moon"',
    );
  });

  it('omits the class attribute when no className is given', () => {
    expect(icon('moon')).not.toContain('class=');
  });

  it('returns an empty string for a missing icon instead of throwing', () => {
    expect(icon('does-not-exist')).toBe('');
  });

  it('refuses path traversal', () => {
    expect(icon('../../../package')).toBe('');
  });

  it('loads every icon committed to public/images/icons', () => {
    const names = readdirSync(ICON_DIR)
      .filter((f) => f.endsWith('.svg'))
      .map((f) => f.replace(/\.svg$/, ''));

    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(icon(name), `icon("${name}") should render`).toContain('<svg');
    }
  });
});
