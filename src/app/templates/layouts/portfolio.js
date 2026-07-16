import { escapeHtml, mergeSeo } from '../utils/helpers.js';
import { assetUrl } from '../../../lib/asset-version.js';

export function buildPortfolioShell({ content, meta = {} }) {
  const seo = mergeSeo(meta);
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const keywords = escapeHtml(seo.keywords);
  const url = escapeHtml(seo.url);
  const prevUrl = escapeHtml(seo.prevUrl);
  const nextUrl = escapeHtml(seo.nextUrl);
  const siteName = escapeHtml(seo.site_name);
  const type = escapeHtml(seo.type);
  const image = escapeHtml(seo.image);
  const imageType = escapeHtml(seo.image_type);
  const imageAlt = escapeHtml(seo.image_alt);
  const imageWidth = escapeHtml(seo.image_width);
  const imageHeight = escapeHtml(seo.image_height);
  const articlePublisher = escapeHtml(seo.article_publisher);
  const articleAuthor = escapeHtml(seo.article_author);
  const articleSection = escapeHtml(seo.article_section || '');
  const robots = escapeHtml(seo.robots || 'index,follow');
  const structuredDataJson = meta.structuredData
    ? JSON.stringify(meta.structuredData).replace(/</g, '\\u003c')
    : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script>
      (function () {
        try {
          if (localStorage.getItem('theme') === 'light') {
            document.documentElement.classList.add('theme-light');
          }
        } catch (e) {}
      })();
    </script>
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${url}" />
    ${prevUrl ? `<link rel="prev" href="${prevUrl}" />` : ''}
    ${nextUrl ? `<link rel="next" href="${nextUrl}" />` : ''}
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="article:publisher" content="${articlePublisher}" />
    <meta property="article:section" content="${articleSection}" />
    <meta property="article:author" content="${articleAuthor}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:type" content="${imageType}" />
    <meta property="og:image:alt" content="${imageAlt}" />
    <meta property="og:image:width" content="${imageWidth}" />
    <meta property="og:image:height" content="${imageHeight}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="${image}" />
    <meta property="twitter:site" content="@joelebukatobi" />
    ${structuredDataJson ? `<script type="application/ld+json">${structuredDataJson}</script>` : ''}
    <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@500;600;700&display=swap" />
    <link rel="stylesheet" href="${assetUrl('/dist/css/app.css')}" />
    <script src="/vendor/htmx/htmx.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  </head>
  <body>
    ${content}
    <div id="cursor-inner"></div>
    <div id="cursor-outer"></div>
    <script>
      (function () {
        const inner = document.getElementById('cursor-inner');
        const outer = document.getElementById('cursor-outer');
        const mobileQuery = window.matchMedia('(max-width: 768px)');
        const clickableSelector =
          'a, button, input, textarea, select, label, [onclick], .works__card, .post__card, .blog__card, .blog-list__card, .navbar__menu, .navbar__theme-btn';
        let enabled = false;

        function onMouseMove(e) {
          const { clientX: x, clientY: y } = e;
          inner.style.left = x + 'px';
          inner.style.top = y + 'px';
          outer.style.left = x + 'px';
          outer.style.top = y + 'px';
        }

        function onMouseOver(e) {
          const overClickable = e.target.closest(clickableSelector);
          inner.classList.toggle('is-hover', Boolean(overClickable));
          outer.classList.toggle('is-hover', Boolean(overClickable));
        }

        function enable() {
          if (enabled) return;
          enabled = true;
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseover', onMouseOver);
        }

        function disable() {
          if (!enabled) return;
          enabled = false;
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseover', onMouseOver);
          inner.classList.remove('is-hover');
          outer.classList.remove('is-hover');
        }

        function sync() {
          if (mobileQuery.matches) disable();
          else enable();
        }

        sync();
        mobileQuery.addEventListener('change', sync);
      })();
    </script>
  </body>
</html>`;
}

export function buildComingSoonShell({ content }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coming Soon</title>
    <meta name="description" content="This site is being configured" />
    <link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
    <link rel="stylesheet" href="${assetUrl('/dist/css/admin.css')}" />
  </head>
  <body>
    ${content}
    <script src="https://cdn.jsdelivr.net/npm/lucide@latest/dist/umd/lucide.min.js"></script>
    <script>lucide.createIcons();</script>
  </body>
</html>`;
}
