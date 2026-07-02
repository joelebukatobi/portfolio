import { navbar } from './navbar.js';
import { headerPartial } from './header.js';
import { footer } from './footer.js';

export function layoutPage({ activePage = null, header = '', content = '', showSocials = true } = {}) {
  return `
${navbar({ activePage })}
<div class="layout-page">
${headerPartial({ header })}
${content}
</div>
${footer({ showSocials })}`;
}
