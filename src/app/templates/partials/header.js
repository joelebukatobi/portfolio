import { escapeHtml } from '../utils/helpers.js';
import { icon } from '../../../lib/icons.js';

export function headerPartial({ header = '' } = {}) {
  return `
  <div class="header-shell container">
    <header class="header">
      <div class="header__title"><h4>${escapeHtml(header)}</h4></div>
      <div class="header__image">
        ${icon('about')}
      </div>
    </header>
    <div class="header-buffer"></div>
  </div>`;
}
