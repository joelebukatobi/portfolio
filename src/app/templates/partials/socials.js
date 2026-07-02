export function socials({ className = 'copyright__list' } = {}) {
  return `
  <ul class="${className}">
    <li>
      <a href="https://www.linkedin.com/in/joelebukatobi/">
        <svg><use href="/images/sprite.svg#icon-linkedin" /></svg>
        <p>LinkedIn</p>
      </a>
    </li>
    <li>
      <a href="https://github.com/joelebukatobi">
        <svg><use href="/images/sprite.svg#icon-github" /></svg>
        <p>Github</p>
      </a>
    </li>
    <li>
      <a href="mailto:joelebuka@gmail.com">
        <svg><use href="/images/sprite.svg#icon-email" /></svg>
        <p>Email</p>
      </a>
    </li>
  </ul>`;
}
