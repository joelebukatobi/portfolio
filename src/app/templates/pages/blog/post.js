import { escapeHtml, truncate, imageUrl } from '../../utils/helpers.js';
import { rewriteContentMediaUrls } from '../../../../lib/media-paths.js';
import { navbar } from '../../partials/navbar.js';
import { footer } from '../../partials/footer.js';
import { asideForPost } from '../../partials/aside.js';
import { postComments } from '../../partials/post-comments.js';
import { formatSiteDate } from '../../../../lib/site-dates.js';
import {
  getPostAuthorName,
  getPostPublishedAt,
  estimateReadingMinutes,
  formatReadingTime,
} from '../../../../lib/post-meta.js';

export function blogPostMeta({ post, apiUrl = '' } = {}) {
  const image = imageUrl(apiUrl, post?.image) || post?.image;
  const ext = post?.image?.includes('.') ? post.image.slice(post.image.indexOf('.') + 1) : 'jpg';

  return {
    title: post?.title || 'Blog Post',
    description: truncate(post?.description || '', 200),
    url: `https://www.joelebukatobi.dev/blog/${post?.slug || ''}`,
    site_name: 'Blog | Joel Ebuka Tobi',
    type: 'article',
    image,
    image_type: `image/${ext}`,
    image_alt: `${post?.slug || 'post'}-thumbnail`,
    article_section: post?.category?.name || '',
  };
}

export function blogPostContent({
  post,
  apiUrl = '',
  comments = [],
  commentsEnabled = true,
  moderateComments = false,
  siteSettings = {},
} = {}) {
  const img = escapeHtml(imageUrl(apiUrl, post.image));
  const title = escapeHtml(post?.title || '');
  const author = escapeHtml(getPostAuthorName(post));
  const publishedAt = getPostPublishedAt(post);
  const publishedLabel = escapeHtml(formatSiteDate(publishedAt, siteSettings));
  const readTime = escapeHtml(formatReadingTime(estimateReadingMinutes(post?.post || post?.description || '')));
  const publishedIso = escapeHtml(publishedAt || '');

  return `
${navbar({ activePage: null })}
<section class="blogpost container">
  <div class="blogpost__image">
    <img src="${img}" alt="post-thumbnail" />
  </div>
  <div class="blogpost__main">
    <div class="blogpost__aside">
      ${asideForPost({ post })}
    </div>
    <div class="blogpost__content">
      <div class="blogpost__meta">
        <span class="blogpost__meta-author">${author}</span>
        ${publishedAt ? `<span class="blogpost__meta-sep" aria-hidden="true">·</span><time class="blogpost__meta-date" datetime="${publishedIso}">${publishedLabel}</time>` : ''}
        <span class="blogpost__meta-sep" aria-hidden="true">·</span>
        <span class="blogpost__meta-read">${readTime}</span>
      </div>
      <h3>${title}</h3>
      <hr class="blogpost__title-divider" />
      ${rewriteContentMediaUrls(post.post || '')}
      ${postComments({
        slug: post.slug,
        comments,
        commentsEnabled,
        moderateComments,
        siteSettings,
      })}
    </div>
  </div>
</section>
<script>
  (function () {
    const content = document.querySelector('.blogpost__content');
    if (!content) return;

    content.querySelectorAll('img').forEach((img) => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const figure = img.closest('figure');
        if (figure) figure.style.display = 'none';
      }, { once: true });
    });

    function isCodeParagraph(p) {
      const code = p.querySelector(':scope > code');
      return code && p.children.length === 1;
    }

    function getCodeText(block) {
      const code = block.querySelector('code');
      return (code ? code.textContent : block.textContent).trim();
    }

    async function copyText(text) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    const blocks = [
      ...content.querySelectorAll('pre'),
      ...[...content.querySelectorAll('p')].filter(isCodeParagraph),
    ];

    blocks.forEach((block) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'blogpost__code';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'blogpost__code-copy';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = '<svg aria-hidden="true"><use href="/images/icons/copy.svg" /></svg>';
      wrapper.appendChild(btn);

      btn.addEventListener('click', async () => {
        try {
          await copyText(getCodeText(block));
          const icon = btn.querySelector('use');
          btn.classList.add('is-copied');
          btn.setAttribute('aria-label', 'Copied');
          if (icon) icon.setAttribute('href', '/images/icons/check.svg');
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.setAttribute('aria-label', 'Copy code');
            if (icon) icon.setAttribute('href', '/images/icons/copy.svg');
          }, 2000);
        } catch (error) {
          console.error('Copy failed:', error);
        }
      });
    });
  })();
</script>
${footer()}`;
}
