export function share({ slug, className = '' } = {}) {
  const extraClass = className ? ` ${className}` : '';
  const url = `https://www.joelebukatobi.dev/blog/${slug}`;

  return `
<div class="blog__share${extraClass}">
  <h6>Share</h6>
  <hr />
  <ul>
    <li>
      <a href="https://www.facebook.com/sharer.php?u=${url}" target="_blank">
        <svg><use href="/images/sprite.svg#icon-facebook" /></svg>
      </a>
    </li>
    <li>
      <a href="https://twitter.com/intent/tweet?url=${url}" target="_blank">
        <svg><use href="/images/sprite.svg#icon-twitter" /></svg>
      </a>
    </li>
    <li>
      <a href="https://www.linkedin.com/shareArticle?url=${url}" target="_blank">
        <svg><use href="/images/sprite.svg#icon-linkedin" /></svg>
      </a>
    </li>
  </ul>
</div>`;
}
