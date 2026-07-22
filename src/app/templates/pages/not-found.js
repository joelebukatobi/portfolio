import { escapeHtml } from '../utils/helpers.js';
import { icon } from '../../../lib/icons.js';

export function notFoundMeta() {
  return {
    title: '404 | Joel Ebuka Tobi',
    description: 'Page not found.',
    url: 'https://joelebukatobi.dev/404',
    robots: 'noindex,nofollow',
  };
}

const folderIcon = icon('folder', { className: 'not-found__icon not-found__icon--folder' });
const minimizeIcon = icon('window-minimize');
const maximizeIcon = icon('window-maximize');
const closeIcon = icon('window-close');

function renderPromptRow({ commandHtml, timeIso, timeLabel, className = '' }) {
  return `
      <div class="not-found__prompt-row${className ? ` ${className}` : ''}">
        <p class="not-found__line not-found__line--command">
          <span class="not-found__session">
            ${folderIcon}
            <span class="not-found__host">joel@portfolio</span>
            <span class="not-found__cwd">~</span>
            <span class="not-found__prompt">%</span>
            ${commandHtml}
          </span>
        </p>
        <div class="not-found__meta">
          <span class="not-found__status-dot" aria-hidden="true"></span>
          <time class="not-found__time" datetime="${timeIso}">${timeLabel}</time>
        </div>
      </div>`;
}

function renderSpec(label, value, { id = '' } = {}) {
  const idAttr = id ? ` id="${id}"` : '';

  return `
          <div class="not-found__spec">
            <dt class="not-found__spec-label">${escapeHtml(label)}</dt>
            <dd class="not-found__spec-value"${idAttr}>${escapeHtml(value)}</dd>
          </div>`;
}

function renderNeofetch({ path, context }) {
  const safePath = escapeHtml(path || '/');

  return `
    <div class="not-found__neofetch">
      <div class="not-found__code-panel">
        <p class="not-found__code" aria-hidden="true">404</p>
      </div>
      <dl class="not-found__specs">
        ${renderSpec('Host', 'guest@web')}
        ${renderSpec('OS', context.os || 'Unknown')}
        ${renderSpec('Browser', context.browser || 'Unknown')}
        ${renderSpec('Shell', 'zsh')}
        ${renderSpec('Terminal', 'portfolio')}
        ${renderSpec('IP', context.ip || 'unknown')}
        ${renderSpec('Locale', context.locale || 'unknown')}
        ${renderSpec('Path', safePath)}
        ${renderSpec('Resolution', '…', { id: 'not-found-resolution' })}
        ${renderSpec('Timezone', '…', { id: 'not-found-timezone' })}
      </dl>
    </div>`;
}

export function notFoundContent({ path = '/', context = {} } = {}) {
  const safePath = escapeHtml(path || '/');
  const now = new Date();
  const timeLabel = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const timeIso = now.toISOString();

  return `
<section class="not-found">
  <div class="not-found__content">
    <header class="not-found__titlebar">
      <span class="not-found__shell">zsh</span>
      <div class="not-found__controls" aria-hidden="true">
        <span class="not-found__control not-found__control--minimize">${minimizeIcon}</span>
        <span class="not-found__control not-found__control--maximize">${maximizeIcon}</span>
        <span class="not-found__control not-found__control--close">${closeIcon}</span>
      </div>
    </header>
    <div class="not-found__terminal">
      ${renderPromptRow({
        commandHtml: `cd ${safePath}`,
        timeIso,
        timeLabel,
      })}
      <p class="not-found__line not-found__line--error">
        cd: no such file or directory: ${safePath}
      </p>
    </div>
    ${renderNeofetch({ path, context })}
    ${renderPromptRow({
      commandHtml: `cd /<a href="/" class="not-found__home"><span class="not-found__cursor" aria-hidden="true">_</span>home</a>`,
      timeIso,
      timeLabel,
      className: 'not-found__prompt-row--home',
    })}
  </div>
  <script>
    (function () {
      var resolution = document.getElementById('not-found-resolution');
      var timezone = document.getElementById('not-found-timezone');

      function getScreenResolution() {
        var screenObj = window.screen;
        var dpr = window.devicePixelRatio || 1;
        var width = Math.round((screenObj.width || window.innerWidth) * dpr);
        var height = Math.round((screenObj.height || window.innerHeight) * dpr);

        return width + 'x' + height;
      }

      if (resolution) {
        resolution.textContent = getScreenResolution();
      }

      if (timezone) {
        try {
          timezone.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
        } catch (error) {
          timezone.textContent = 'unknown';
        }
      }
    })();
  </script>
</section>`;
}
