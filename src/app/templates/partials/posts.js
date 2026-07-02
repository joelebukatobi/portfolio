import { escapeHtml, truncate } from '../utils/helpers.js';

export function posts({ posts = [], className = 'post__row', page = 'post', limit = 3 } = {}) {
  const items = posts.slice(0, limit).map((post) => {
    const slug = escapeHtml(post.slug);
    const title = escapeHtml(post.title);
    const description = escapeHtml(truncate(post.description, 200));

    return `
<div class="${page}__card" onclick="window.location.href='/blog/${slug}'">
  <h4>${title}</h4>
  <p>
    ${description}
    <a href="/blog/${slug}"> Read More</a>
  </p>
</div>`;
  }).join('');

  return `<div class="${className}">${items}</div>`;
}

export function blogPosts({ posts = [], descriptionLength = 200 } = {}) {
  return posts.map((post) => {
    const slug = escapeHtml(post.slug);
    const title = escapeHtml(post.title);
    const description = escapeHtml(truncate(post.description, descriptionLength));

    return `
<div class="blog__card" onclick="window.location.href='/blog/${slug}'">
  <h4>${title}</h4>
  <p>
    ${description}
    <a href="/blog/${slug}"> Read More</a>
  </p>
</div>`;
  }).join('');
}
