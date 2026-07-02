import { socials } from './socials.js';
import { copyrightDesign } from './copyright.js';

export function footer({ showSocials = true } = {}) {
  return `
<section class="copyright">
  <div class="container">
    ${showSocials ? socials() : ''}
    ${copyrightDesign()}
  </div>
</section>`;
}
