import { escapeHtml } from '../utils/helpers.js';

export function headerPartial({ header = '' } = {}) {
  return `
  <div class="header-shell container">
    <header class="header">
      <div class="header__title"><h4>${escapeHtml(header)}</h4></div>
      <div class="header__image">
        <svg><use href="/images/icons/about.svg" /></svg>
      </div>
    </header>
  </div>`;
}
