import { escapeHtml, truncate, imageUrl } from '../../utils/helpers.js';
import { navbar } from '../../partials/navbar.js';
import { footer } from '../../partials/footer.js';
import { share } from '../../partials/share.js';
import { asideForPost } from '../../partials/aside.js';

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

export function blogPostContent({ post, apiUrl = '' } = {}) {
  const img = escapeHtml(imageUrl(apiUrl, post.image));
  const title = escapeHtml(post?.title || '');

  return `
${navbar({ activePage: null })}
<section class="blogpost container">
  <div class="blogpost__image">
    <img src="${img}" alt="post-thumbnail" />
  </div>
  <div class="blogpost__main">
    <div class="blogpost__aside">
      ${asideForPost({ post })}
      ${share({ slug: post.slug, className: 'blogpost__share' })}
    </div>
    <div class="blogpost__content">
      <h3>${title}</h3>
      ${post.post || ''}
    </div>
  </div>
</section>
<script>
  (function () {
    const content = document.querySelector('.blogpost__content');
    if (!content) return;

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
      btn.innerHTML = '<svg aria-hidden="true"><use href="/images/sprite.svg#icon-copy" /></svg>';
      wrapper.appendChild(btn);

      btn.addEventListener('click', async () => {
        try {
          await copyText(getCodeText(block));
          const icon = btn.querySelector('use');
          btn.classList.add('is-copied');
          btn.setAttribute('aria-label', 'Copied');
          if (icon) icon.setAttribute('href', '/images/sprite.svg#icon-check');
          setTimeout(() => {
            btn.classList.remove('is-copied');
            btn.setAttribute('aria-label', 'Copy code');
            if (icon) icon.setAttribute('href', '/images/sprite.svg#icon-copy');
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
