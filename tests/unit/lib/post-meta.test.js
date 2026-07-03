import { describe, it, expect } from 'vitest';
import {
  getPostAuthorName,
  estimateReadingMinutes,
  formatReadingTime,
} from '../../../src/lib/post-meta.js';

describe('post-meta', () => {
  it('formats author name from post user', () => {
    expect(getPostAuthorName({
      user: { first_name: 'Joel', last_name: 'Tobi' },
    })).toBe('Joel Tobi');
  });

  it('estimates reading time from html content', () => {
    const html = '<p>' + 'word '.repeat(400) + '</p>';
    expect(estimateReadingMinutes(html)).toBe(2);
  });

  it('formats reading time label', () => {
    expect(formatReadingTime(1)).toBe('1 Minute Read');
    expect(formatReadingTime(5)).toBe('5 Minutes Read');
  });
});
