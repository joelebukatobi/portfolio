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
  const postUrl = `https://joelebukatobi.dev/blog/${post?.slug || ''}`;
  const authorName = getPostAuthorName(post);
  const publishedAt = getPostPublishedAt(post);

  return {
    title: post?.title || 'Blog Post',
    description: truncate(post?.description || '', 200),
    url: postUrl,
    site_name: 'Blog | Joel Ebuka Tobi',
    type: 'article',
    image,
    image_type: `image/${ext}`,
    image_alt: `${post?.slug || 'post'}-thumbnail`,
    article_section: post?.category?.name || '',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post?.title || 'Blog Post',
      description: truncate(post?.description || '', 200),
      url: postUrl,
      mainEntityOfPage: postUrl,
      ...(image ? { image } : {}),
      ...(publishedAt ? { datePublished: publishedAt } : {}),
      author: {
        '@type': 'Person',
        name: authorName || 'Joel Ebuka Tobi',
      },
    },
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
  const likeCount = post.likes || 0;
  const likedByViewer = !!post.liked_by_viewer;

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
        <span class="blogpost__meta-sep" aria-hidden="true">·</span>
        <button
          type="button"
          class="blogpost__like"
          id="like-button"
          data-liked="${likedByViewer ? 'true' : 'false'}"
          aria-pressed="${likedByViewer ? 'true' : 'false'}"
          aria-label="${likedByViewer ? 'Unlike this post' : 'Like this post'}"
        >
          <svg class="blogpost__like-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21C12 21 3 15.5 3 9.5C3 6.5 5.5 4 8.5 4C10.2 4 11.5 4.8 12 6C12.5 4.8 13.8 4 15.5 4C18.5 4 21 6.5 21 9.5C21 15.5 12 21 12 21Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <span class="blogpost__like-count" id="like-count">${likeCount}</span>
        </button>
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

    const likeButton = document.getElementById('like-button');
    const likeCountEl = document.getElementById('like-count');
    if (likeButton && likeCountEl) {
      const slug = ${JSON.stringify(post.slug)};

      likeButton.addEventListener('click', async () => {
        likeButton.disabled = true;
        try {
          const res = await fetch('/api/v1/posts/' + encodeURIComponent(slug) + '/like', {
            method: 'POST',
          });
          if (!res.ok) return;
          const data = await res.json();
          likeButton.dataset.liked = data.liked ? 'true' : 'false';
          likeButton.setAttribute('aria-pressed', data.liked ? 'true' : 'false');
          likeButton.setAttribute('aria-label', data.liked ? 'Unlike this post' : 'Like this post');
          likeCountEl.textContent = data.likeCount;
        } catch (error) {
          console.error('Like failed:', error);
        } finally {
          likeButton.disabled = false;
        }
      });
    }

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
