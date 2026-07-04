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
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><use href="/images/icons/link.svg" /></svg>
        <p>Live</p>
      </div>
    </a>
  </div>
</div>`;
}

export function projectsGrid({ projects = [] } = {}) {
  return projects.map((project) => projectCard({ project })).join('');
}
