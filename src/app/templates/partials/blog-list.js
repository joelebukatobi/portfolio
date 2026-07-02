import {
  escapeHtml,
  truncate,
  formatAuthorName,
  formatPostDate,
  buildBlogQuery,
  BLOG_SHELL_HTMX,
} from '../utils/helpers.js';

function postCards(posts = []) {
  if (!posts.length) {
    return '<p class="blog-list__empty">No posts found.</p>';
  }

  return posts.map((post) => {
    const slug = escapeHtml(post.slug);
    const title = escapeHtml(post.title);
    const excerpt = escapeHtml(truncate(post.description, 200));
    const author = escapeHtml(formatAuthorName(post.user) || 'Joel Onwuanaku');
    const date = escapeHtml(formatPostDate(post.published_at || post.created_at));
    const href = `/blog/${slug}`;

    return `
<article class="blog-list__card" onclick="window.location.href='${href}'">
  <h4 class="blog-list__card-title">${title}</h4>
  <p class="blog-list__card-excerpt">${excerpt}</p>
  <p class="blog-list__card-meta">
    <span>${author}</span>
    <span class="blog-list__card-sep">|</span>
    <time datetime="${date}">${date}</time>
    <span class="blog-list__card-sep">|</span>
    <a href="${href}" class="blog-list__card-read-more">Read More</a>
  </p>
</article>`;
  }).join('');
}

function pagination({ meta = {}, filters = {} } = {}) {
  const current = meta.current_page || 1;
  const last = meta.last_page || 1;
  if (last <= 1) return '';

  const pages = [];
  for (let i = 1; i <= last; i += 1) {
    const href = buildBlogQuery({ ...filters, page: i });
    const active = i === current ? ' is-active' : '';
    pages.push(
      `<a href="${href}" class="blog-list__page${active}" ${BLOG_SHELL_HTMX} hx-get="${href}">${i}</a>`,
    );
  }

  return `<nav class="blog-list__pagination" aria-label="Blog pagination">${pages.join('')}</nav>`;
}

export function blogListPanel({
  posts = [],
  meta = {},
  filters = {},
} = {}) {
  return `
<div id="blog-panel">
  <div class="blog-list__list">
    ${postCards(posts)}
  </div>
  ${pagination({ meta, filters })}
</div>`;
}
