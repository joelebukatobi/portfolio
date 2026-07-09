import { layoutPage } from '../../partials/layout-page.js';
import { projectsGrid } from '../../components/project-card.js';

export function projectsMeta() {
  return {
    title: 'Projects | Joel Ebuka Tobi',
    description:
      'A showcase of web applications and platforms built by Joel Onwuanaku, spanning e-commerce, healthcare, and remote-team tooling.',
    url: 'https://joelebukatobi.dev/projects',
  };
}

export function projectsContent({ projects = [], apiUrl = '' } = {}) {
  const content = `
<section id="projects" class="works container">
  ${
    projects.length === 0
      ? `<div class="works__empty">
          <img src="/images/pics/under_construction.png" alt="" width="240" height="240" />
          <p>Projects are on the way — check back soon.</p>
        </div>`
      : `<div class="works__grid">${projectsGrid({ projects, apiUrl })}</div>`
  }
</section>`;

  return layoutPage({
    activePage: 'portfolio',
    header: '_portfolio',
    content,
  });
}
