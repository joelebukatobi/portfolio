import { describe, it, expect } from 'vitest';
import {
  toPublicMediaUrl,
  mediaItemPublicUrl,
  rewriteContentMediaUrls,
  isLocalDevMediaUrl,
  addLazyLoadingToImages,
} from '../../../src/lib/media-paths.js';

describe('toPublicMediaUrl', () => {
  it('normalizes legacy public/ paths without leading slash', () => {
    expect(toPublicMediaUrl('public/uploads/posts/post-123.jpg')).toBe(
      '/public/uploads/posts/post-123.jpg',
    );
  });

  it('passes through /public/ paths', () => {
    expect(toPublicMediaUrl('/public/uploads/images/foo.jpg')).toBe(
      '/public/uploads/images/foo.jpg',
    );
  });

  it('normalizes uploads/ paths', () => {
    expect(toPublicMediaUrl('uploads/images/foo.jpg')).toBe('/public/uploads/images/foo.jpg');
  });

  it('returns empty string for falsy input', () => {
    expect(toPublicMediaUrl(null)).toBe('');
    expect(toPublicMediaUrl('')).toBe('');
  });

  it('passes through absolute http URLs', () => {
    expect(toPublicMediaUrl('https://cdn.example.com/img.jpg')).toBe(
      'https://cdn.example.com/img.jpg',
    );
  });

  it('rewrites localhost absolute URLs to /public paths', () => {
    expect(toPublicMediaUrl('http://0.0.0.0:3000/public/uploads/posts/post-1.jpeg')).toBe(
      '/public/uploads/posts/post-1.jpeg',
    );
  });
});

describe('isLocalDevMediaUrl', () => {
  it('detects loopback editor URLs', () => {
    expect(isLocalDevMediaUrl('http://0.0.0.0:3000/public/uploads/posts/a.jpeg')).toBe(true);
    expect(isLocalDevMediaUrl('/public/uploads/posts/a.jpeg')).toBe(false);
  });
});

describe('addLazyLoadingToImages', () => {
  it('adds loading="lazy" to img tags without one', () => {
    expect(addLazyLoadingToImages('<img src="/foo.jpg">')).toBe(
      '<img loading="lazy" src="/foo.jpg">',
    );
  });

  it('leaves img tags that already have a loading attribute untouched', () => {
    const html = '<img src="/foo.jpg" loading="eager">';
    expect(addLazyLoadingToImages(html)).toBe(html);
  });

  it('does not touch video or source tags', () => {
    const html = '<video src="/foo.mp4"><source src="/bar.mp4"></video>';
    expect(addLazyLoadingToImages(html)).toBe(html);
  });

  it('handles multiple images in one string', () => {
    const html = '<p><img src="/a.jpg"></p><p><img src="/b.jpg"></p>';
    expect(addLazyLoadingToImages(html)).toBe(
      '<p><img loading="lazy" src="/a.jpg"></p><p><img loading="lazy" src="/b.jpg"></p>',
    );
  });

  it('returns empty string for falsy input', () => {
    expect(addLazyLoadingToImages(null)).toBe('');
    expect(addLazyLoadingToImages('')).toBe('');
  });
});

describe('rewriteContentMediaUrls', () => {
  it('rewrites localhost img src in post HTML', () => {
    const html =
      '<figure class="image"><img src="http://0.0.0.0:3000/public/uploads/posts/post-1.jpeg"></figure>';
    expect(rewriteContentMediaUrls(html)).toBe(
      '<figure class="image"><img src="/public/uploads/posts/post-1.jpeg"></figure>',
    );
  });
});

describe('mediaItemPublicUrl', () => {
  it('prefers full path over thumbnail', () => {
    expect(
      mediaItemPublicUrl({
        path: 'public/uploads/posts/full.jpg',
        thumbnailPath: '/public/uploads/posts/thumbs/thumb.jpg',
      }),
    ).toBe('/public/uploads/posts/full.jpg');
  });

  it('falls back to thumbnail when full path is missing', () => {
    expect(
      mediaItemPublicUrl({
        thumbnailPath: '/public/uploads/posts/thumbs/thumb.jpg',
      }),
    ).toBe('/public/uploads/posts/thumbs/thumb.jpg');
  });

  it('returns null for missing item', () => {
    expect(mediaItemPublicUrl(null)).toBe(null);
  });
});
