import { escapeHtml } from '../utils/helpers.js';
import { icon } from '../../../lib/icons.js';

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
        ${icon('link')}
        <p>Live</p>
      </div>
    </a>
  </div>
</div>`;
}

export function projectsGrid({ projects = [] } = {}) {
  return projects.map((project) => projectCard({ project })).join('');
}
