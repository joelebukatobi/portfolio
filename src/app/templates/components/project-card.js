import { escapeHtml } from '../utils/helpers.js';

export function projectCard({ project }) {
  const website = escapeHtml(project.website || '#');

  return `
<div class="works__card" onclick="window.open('${website}', '_blank')">
  <h5>${escapeHtml(project.name)}</h5>
  <p>${escapeHtml(project.description)}</p>
  <p>${escapeHtml(project.technologies)}</p>
  <div class="works__card__group">
    <a href="${website}" target="_blank" rel="noopener noreferrer">
      <div class="works__card__project">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18.4444 13.9259V19.9259C18.4444 20.4564 18.2336 20.9651 17.8586 21.3401C17.4835 21.7152 16.9748 21.9259 16.4444 21.9259H5.44434C4.91391 21.9259 4.4052 21.7152 4.03012 21.3401C3.65505 20.9651 3.44434 20.4564 3.44434 19.9259V8.9259C3.44434 8.39547 3.65505 7.88676 4.03012 7.51168C4.4052 7.13661 4.91391 6.9259 5.44434 6.9259H11.4444" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.4443 3.9259H21.4443V9.9259" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.4443 14.9259L21.4443 3.9259" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Live</p>
      </div>
    </a>
  </div>
</div>`;
}

export function projectsGrid({ projects = [] } = {}) {
  return projects.map((project) => projectCard({ project })).join('');
}
