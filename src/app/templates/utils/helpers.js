export function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function truncate(text, length) {
  if (!text || text.length <= length) return text || '';
  return `${text.substring(0, length)}...`;
}

export function activeNavClass(activePage, page) {
  if (!activePage || activePage !== page) return '';
  return `navbar__${page}`;
}

export function imageUrl(apiUrl, path) {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/')) return path;
  return `${apiUrl}/storage/${path}`;
}

export const DEFAULT_SEO = {
  title: 'Joel Ebuka Tobi | Web Developer',
  site_name: 'Joel Ebuka Tobi | Web Developer',
  description: `Hi, there I'm a web developer who is passionate about solving problems with code and transforming ideas from pixels perfect designs to scalable products. My job description entails creating and building amazing experiences for the next billion users. My main focus is front-end development and user-interface design. At the moment I'm currently transitioning into a fullstack role while exploring the world of DevOps as well as technical writing.`,
  url: 'https://www.joelebukatobi.dev',
  type: 'profile',
  article_publisher: 'https://www.joelebukatobi.dev',
  article_author: 'Joel Ebuka Tobi',
  article_section: '',
  keywords:
    'web development, web design, software development, branding, identity branding, mobile app development, mobile app design, ui/ux design, IT consultancy, web development, html, css, tailwindcss, tailwind javascript, responsive design, seo optimization, frontend, front-end, backend, back-end, full stack, front-end development, backend development, frontend web development, backend web development, web design, cross-browser compatibility, user experience (UX), web performance optimization, react, vue, CMS, strapi, payload cms, web standards, accessibility, git, webpack, web development trends, web development best practices, jQuery, bootstrap, php, wordpress, laravel, amazon web services, docker, github, github actions, kubernetes, terraform, typescript, python, fast api, elixir, phoenix, testing, cypress',
  image: 'https://www.joelebukatobi.dev/images/pics/og-image.png',
  image_type: 'image/jpg',
  image_alt: 'Open Graph Image',
  image_width: '1200',
  image_height: '627',
};

export function mergeSeo(meta = {}) {
  return { ...DEFAULT_SEO, ...meta };
}

export function formatAuthorName(user) {
  if (!user) return '';
  const first = user.first_name || user.firstName || '';
  const last = user.last_name || user.lastName || '';
  return `${first} ${last}`.trim();
}

export function formatPostDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function buildHomeQuery({ page, category, tag, year, search } = {}) {
  const params = new URLSearchParams();
  if (page && page > 1) params.set('page', String(page));
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);
  if (year) params.set('year', String(year));
  if (search) params.set('search', search);
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
}

export function buildBlogQuery({ page, category, tag, year, search } = {}) {
  const params = new URLSearchParams();
  if (page && page > 1) params.set('page', String(page));
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);
  if (year) params.set('year', String(year));
  if (search) params.set('search', search);
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
}

export const BLOG_SHELL_HTMX =
  'hx-target="#blog-shell" hx-select="#blog-shell" hx-swap="outerHTML" hx-push-url="true"';
