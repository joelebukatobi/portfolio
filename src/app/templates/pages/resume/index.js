import { layoutPage } from '../../partials/layout-page.js';
import { resume } from '../../partials/resume.js';

export function resumeMeta() {
  return {
    title: 'Resume | Joel Ebuka Tobi',
    description:
      "Joel Onwuanaku's work experience across product management and software engineering — including a Senior Product Manager internship at Amazon and senior frontend/web developer roles across e-commerce, telecom, and IT consulting.",
    url: 'https://joelebukatobi.dev/resume',
  };
}

export function resumeContent() {
  return layoutPage({
    activePage: 'resume',
    header: '_resume',
    content: resume(),
  });
}
