import { layoutPage } from '../../partials/layout-page.js';
import { resume } from '../../partials/resume.js';

export function resumeMeta() {
  return {
    title: 'Resume | Joel Ebuka Tobi',
    url: 'https://www.joelebukatobi.dev/resume',
  };
}

export function resumeContent() {
  return layoutPage({
    activePage: 'resume',
    header: '_resume',
    content: resume(),
  });
}
