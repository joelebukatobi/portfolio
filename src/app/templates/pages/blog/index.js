import { layoutPage } from '../../partials/layout-page.js';
import { aside, blogSearchForm } from '../../partials/aside.js';
import { blogListPanel } from '../../partials/blog-list.js';
import { escapeHtml } from '../../utils/helpers.js';

export function blogIndexMeta() {
  return {
    title: 'Joel Ebuka Tobi | Product Manager',
    url: 'https://www.joelebukatobi.dev',
    site_name: 'Joel Ebuka Tobi | Product Manager',
  };
}

export function blogIndexContent({
  posts = [],
  meta = {},
  categories = [],
  tags = [],
  years = [],
  filters = {},
} = {}) {
  const searchValue = escapeHtml(filters.search || '');

  const content = `
<section class="blog container" x-data="{ searchQuery: '${searchValue}' }">
  <div id="blog-shell" class="blog__shell">
    <div class="blog__right">
      ${aside({ categories, tags, years, filters })}
    </div>
    <div class="blog__left">
      ${blogSearchForm({ filters, modifier: 'main' })}
      ${blogListPanel({ posts, meta, filters })}
    </div>
  </div>
</section>`;

  return layoutPage({
    activePage: null,
    header: '_blog',
    content,
  });
}
