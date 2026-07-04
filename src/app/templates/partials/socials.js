export function socials({ className = 'copyright__list' } = {}) {
  return `
  <ul class="${className}">
    <li>
      <a href="https://www.linkedin.com/in/joelebukatobi/">
        <img class="brand-icon" src="/images/icons/linkedin.svg" alt="" aria-hidden="true" />
        <p>LinkedIn</p>
      </a>
    </li>
    <li>
      <a href="https://github.com/joelebukatobi">
        <img class="brand-icon" src="/images/icons/github.svg" alt="" aria-hidden="true" />
        <p>Github</p>
      </a>
    </li>
    <li>
      <a href="mailto:joelebuka@gmail.com">
        <img class="brand-icon" src="/images/icons/email.svg" alt="" aria-hidden="true" />
        <p>Email</p>
      </a>
    </li>
  </ul>`;
}
