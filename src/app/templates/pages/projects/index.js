import { layoutPage } from '../../partials/layout-page.js';
import { projectsGrid } from '../../components/project-card.js';

export function projectsMeta() {
  return {
    title: 'Projects | Joel Ebuka Tobi',
    url: 'https://www.joelebukatobi.dev/projects',
  };
}

export function projectsContent({ projects = [], apiUrl = '' } = {}) {
  const content = `
<section id="projects" class="works container">
  <div class="works__grid">
    ${projectsGrid({ projects, apiUrl })}
  </div>
</section>`;

  return layoutPage({
    activePage: 'portfolio',
    header: '_portfolio',
    content,
  });
}
