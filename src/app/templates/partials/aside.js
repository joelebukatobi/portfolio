import { escapeHtml, buildBlogQuery, BLOG_SHELL_HTMX } from '../utils/helpers.js';
import { shareIconLinks } from './share.js';

function filterHref({ filters, clear = [] }) {
  const next = { ...filters, page: 1 };
  for (const key of clear) delete next[key];
  return buildBlogQuery(next);
}

function asideHtmx(enabled = true) {
  if (!enabled) return '';
  return BLOG_SHELL_HTMX;
}

function postYear(post) {
  const iso = post?.published_at || post?.created_at;
  return iso ? String(new Date(iso).getFullYear()) : '';
}

function postActiveLink(href, label) {
  return `<li><a href="${href}" class="blog__aside-link blog__aside-link--all is-active">${escapeHtml(label)}</a></li>`;
}

export function blogSearchForm({ filters = {}, htmx = true, modifier = '' } = {}) {
  const searchValue = escapeHtml(filters.search || '');
  const htmxFormAttrs = htmx
    ? `hx-get="/" hx-trigger="submit" ${BLOG_SHELL_HTMX}`
    : '';
  const modifierClass = modifier ? ` blog__search--${modifier}` : '';

  return `
<form
  class="blog__search${modifierClass}"
  action="/"
  method="get"
  ${htmxFormAttrs}
>
  <input type="hidden" name="category" value="${escapeHtml(filters.category || '')}" />
  <input type="hidden" name="tag" value="${escapeHtml(filters.tag || '')}" />
  <input type="hidden" name="year" value="${escapeHtml(filters.year || '')}" />
  <div class="blog__search-field">
    <input
      x-ref="searchInput"
      type="search"
      name="search"
      value="${searchValue}"
      placeholder="Search"
      class="blog__search-input"
      @input="searchQuery = $event.target.value"
      @focus="$el.placeholder = ''"
      @blur="if (!$el.value) $el.placeholder = 'Search'"
    />
    <button
      type="button"
      class="blog__search-clear"
      aria-label="Clear search"
      x-show="searchQuery"
      x-cloak
      @click="searchQuery = ''; $refs.searchInput.value = ''; $refs.searchInput.focus(); $el.closest('form').requestSubmit()"
    >
      <svg viewBox="0 0 25 25" fill="none" aria-hidden="true">
        <path d="M12.1611 22.064C17.684 22.064 22.1611 17.5868 22.1611 12.064C22.1611 6.54112 17.684 2.06396 12.1611 2.06396C6.63829 2.06396 2.16113 6.54112 2.16113 12.064C2.16113 17.5868 6.63829 22.064 12.1611 22.064Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.1611 9.06396L9.16113 15.064" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9.16113 9.06396L15.1611 15.064" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</form>`;
}

function asideLinks({
  items = [],
  filters = {},
  param,
  labelKey = 'name',
  valueKey = 'slug',
  htmx = true,
}) {
  const htmxAttrs = asideHtmx(htmx);
  const allHref = filterHref({ filters, clear: [param] });

  const options = items.map((item) => {
    const value = item[valueKey];
    const label = item[labelKey] || item.title || value;
    const href = buildBlogQuery({ ...filters, [param]: value, page: 1 });
    const active = filters[param] === String(value) ? ' is-active' : '';
    return `<li><a href="${href}" class="blog__aside-link${active}" ${htmxAttrs} hx-get="${href}">${escapeHtml(label)}</a></li>`;
  }).join('');

  return `
    <li><a href="${allHref}" class="blog__aside-link blog__aside-link--all${!filters[param] ? ' is-active' : ''}" ${htmxAttrs} hx-get="${allHref}">all</a></li>
    ${options}`;
}

function defaultFilterTab(filters = {}) {
  if (filters.year) return 'date';
  if (filters.tag) return 'tags';
  return 'categories';
}

function filterPanel({ className, tabId, title, listContent }) {
  return `
<div class="${className} blog__filters-panel" x-show="filterTab === '${tabId}'" x-cloak role="tabpanel">
  <h6>${title}</h6>
  <hr />
  <ul>
    ${listContent}
  </ul>
</div>`;
}

function blogShareUrl({ slug, filters = {} } = {}) {
  const base = 'https://www.joelebukatobi.dev';
  if (slug) return `${base}/blog/${slug}`;
  return `${base}${buildBlogQuery(filters)}`;
}

function filterTabsWrapper({ filters = {}, categoryList, tagList, dateList, shareUrl }) {
  const activeTab = defaultFilterTab(filters);
  const tabs = [
    { id: 'categories', label: 'categories' },
    { id: 'tags', label: 'tags' },
    { id: 'date', label: 'date' },
    { id: 'share', label: 'share' },
  ];

  const filterTabs = tabs.map(({ id, label }) => `
    <span
      role="tab"
      class="blog__filters-tab"
      :class="{ 'is-active': filterTab === '${id}' }"
      :aria-selected="filterTab === '${id}'"
      @click="filterTab = '${id}'"
    >${label}</span>`).join('');

  const sharePanel = filterPanel({
    className: 'blog__share',
    tabId: 'share',
    title: 'share',
    listContent: shareIconLinks({ url: shareUrl }),
  });

  return `
<div class="blog__filters" x-data="{ filterTab: '${activeTab}' }">
  <div class="blog__filters-tabs" role="tablist" aria-label="Blog filters">
    ${filterTabs}
  </div>
  <hr class="blog__filters-divider" />
  <div class="blog__filters-panels">
    ${filterPanel({ className: 'blog__categories', tabId: 'categories', title: 'categories', listContent: categoryList })}
    ${filterPanel({ className: 'blog__tags', tabId: 'tags', title: 'tags', listContent: tagList })}
    ${filterPanel({ className: 'blog__date', tabId: 'date', title: 'date', listContent: dateList })}
    ${sharePanel}
  </div>
</div>`;
}

function dateLinks({ years = [], filters = {} }) {
  return `
    <li><a href="${filterHref({ filters, clear: ['year'] })}" class="blog__aside-link blog__aside-link--all${!filters.year ? ' is-active' : ''}" ${asideHtmx()} hx-get="${filterHref({ filters, clear: ['year'] })}">all</a></li>
    ${years.map((yearItem) => {
      const href = buildBlogQuery({ ...filters, year: yearItem, page: 1 });
      const active = String(filters.year) === String(yearItem) ? ' is-active' : '';
      return `<li><a href="${href}" class="blog__aside-link${active}" ${asideHtmx()} hx-get="${href}">${yearItem}</a></li>`;
    }).join('')}`;
}

export function asideForPost({ post } = {}) {
  const category = post?.category;
  const postTags = post?.tags || [];
  const year = postYear(post);

  const categoryLinks = category
    ? postActiveLink(
        buildBlogQuery({ category: category.slug, page: 1 }),
        category.name,
      )
    : '';

  const tagLinks = postTags
    .map((tag) => postActiveLink(buildBlogQuery({ tag: tag.slug, page: 1 }), tag.name))
    .join('');

  const yearLinks = year
    ? postActiveLink(buildBlogQuery({ year, page: 1 }), year)
    : '';

  return filterTabsWrapper({
    categoryList: categoryLinks,
    tagList: tagLinks,
    dateList: yearLinks,
    shareUrl: blogShareUrl({ slug: post?.slug }),
  });
}

export function aside({
  categories = [],
  tags = [],
  years = [],
  filters = {},
} = {}) {
  return `
${blogSearchForm({ filters, modifier: 'aside' })}
${filterTabsWrapper({
  filters,
  categoryList: asideLinks({ items: categories, filters, param: 'category' }),
  tagList: asideLinks({ items: tags, filters, param: 'tag' }),
  dateList: dateLinks({ years, filters }),
  shareUrl: blogShareUrl({ filters }),
})}`;
}
