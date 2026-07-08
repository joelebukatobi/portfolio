import { escapeHtml, truncate } from '../../utils/helpers.js';
import { layoutPage } from '../../partials/layout-page.js';
import { aside } from '../../partials/aside.js';

export function blogCategoryMeta({ category } = {}) {
  return {
    title: category?.name || 'Blog Category',
    description: truncate(category?.description || '', 100),
    url: `https://joelebukatobi.dev/blog/category/${category?.slug || ''}`,
    site_name: 'Blog | Joel Ebuka Tobi',
    article_section: category?.name || '',
  };
}

export function blogCategoryContent({ posts = [], category = {}, categories = [] } = {}) {
  const categorySlug = escapeHtml(category.slug || '');
  const categoryName = escapeHtml(category.name || '');
  const categoryDescription = escapeHtml(category.description || '');

  const cards = posts.map((post) => {
    const slug = escapeHtml(post.slug);
    const title = escapeHtml(post.title);
    const description = escapeHtml(truncate(post.description, 200));

    return `
<div class="blog__card">
  <h4>${title}</h4>
  <p>${description}</p>
  <a href="/blog/${slug}">Read More</a>
</div>`;
  }).join('');

  const content = `
<section class="blog container">
  <div class="blog__right">
    ${aside({ categories })}
  </div>
  <div class="blog__left">
    <div class="blog__heading">
      <p><a href="/">Blog</a> / <a href="/blog/category/${categorySlug}">${categoryName}</a></p>
      <p>${categoryDescription}</p>
    </div>
    ${cards}
  </div>
</section>`;

  return layoutPage({
    activePage: null,
    header: '_blog',
    content,
  });
}
