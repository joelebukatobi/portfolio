import { layoutPage } from '../../partials/layout-page.js';
import { aside, blogSearchForm } from '../../partials/aside.js';
import { blogListPanel } from '../../partials/blog-list.js';
import { escapeHtml } from '../../utils/helpers.js';

export function blogIndexMeta({ page = 1, lastPage = 1, hasFilters = false } = {}) {
  const base = 'https://joelebukatobi.dev';
  const isSelfCanonical = !hasFilters && page > 1;
  const url = isSelfCanonical ? `${base}/?page=${page}` : base;
  const prevUrl = isSelfCanonical ? (page - 1 > 1 ? `${base}/?page=${page - 1}` : base) : undefined;
  const nextUrl = !hasFilters && page < lastPage ? `${base}/?page=${page + 1}` : undefined;

  return {
    title: "Joel's Blog",
    description:
      'A blog about product management, software engineering, and AI — from LLMs and agentic systems to cloud infrastructure and devops, written by Joel Onwuanaku.',
    url,
    site_name: "Joel's Blog",
    prevUrl,
    nextUrl,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Joel Ebuka Tobi',
      url: base,
      jobTitle: 'Product Manager',
    },
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
