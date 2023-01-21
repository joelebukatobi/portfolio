export default function Share({ className, slug }) {
  return (
    <div className={`blog__share ${className}`}>
      <h6>Share</h6>
      <hr />
      <ul>
        <li>
          <a href={`https://www.facebook.com/sharer.php?u=https://www.joelebukatobi.dev/blog/${slug}`} target="_blank">
            <svg>
              <use href="/images/sprite.svg/#icon-facebook" />
            </svg>
          </a>
        </li>
        <li>
          <a href={`https://twitter.com/intent/tweet?url=https://www.joelebukatobi.dev/blog/${slug}`}>
            <svg>
              <use href="/images/sprite.svg/#icon-twitter" />
            </svg>
          </a>
        </li>
        <li>
          <a href={`https://www.linkedin.com/shareArticle?url=https://www.joelebukatobi.dev/blog/${slug}`}>
            <svg>
              <use href="/images/sprite.svg/#icon-linkedin" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );
}
