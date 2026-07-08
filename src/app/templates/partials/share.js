export function shareIconLinks({ slug, url } = {}) {
  const shareUrl = url || `https://joelebukatobi.dev/blog/${slug}`;

  return `
    <li>
      <a href="https://www.facebook.com/sharer.php?u=${shareUrl}" target="_blank" rel="noopener noreferrer">
        <img class="brand-icon" src="/images/icons/facebook.svg" alt="" aria-hidden="true" />
      </a>
    </li>
    <li>
      <a href="https://twitter.com/intent/tweet?url=${shareUrl}" target="_blank" rel="noopener noreferrer">
        <img class="brand-icon" src="/images/icons/twitter.svg" alt="" aria-hidden="true" />
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/shareArticle?url=${shareUrl}" target="_blank" rel="noopener noreferrer">
        <img class="brand-icon" src="/images/icons/linkedin.svg" alt="" aria-hidden="true" />
      </a>
    </li>`;
}

export function share({ slug, className = '' } = {}) {
  const extraClass = className ? ` ${className}` : '';

  return `
<div class="blog__share${extraClass}">
  <h6>Share</h6>
  <hr />
  <ul>
    ${shareIconLinks({ slug })}
  </ul>
</div>`;
}
