import { escapeHtml } from '../utils/helpers.js';

export function notFoundMeta() {
  return {
    title: '404 | Joel Ebuka Tobi',
    description: 'Page not found.',
    url: 'https://www.joelebukatobi.dev/404',
    robots: 'noindex,nofollow',
  };
}

const folderIcon = `
<svg class="not-found__icon not-found__icon--folder" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
</svg>`;

const minimizeIcon = `
<svg viewBox="0 0 16 16" aria-hidden="true">
  <path d="M3 11h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const maximizeIcon = `
<svg viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 4v3h3M12 12v-3H9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const closeIcon = `
<svg viewBox="0 0 16 16" aria-hidden="true">
  <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

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
