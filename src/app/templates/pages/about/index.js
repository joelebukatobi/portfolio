import { layoutPage } from '../../partials/layout-page.js';
import { about } from '../../partials/about.js';

export function aboutMeta() {
  return {
    title: 'About | Joel Ebuka Tobi',
    description:
      "Joel Onwuanaku's path from full-stack engineering to product management, including a Senior Product Manager internship at Amazon — and what this blog covers: AI, cloud infrastructure, devops, and turning technical execution into real-world value.",
    url: 'https://joelebukatobi.dev/about',
  };
}

export function aboutContent() {
  return layoutPage({
    activePage: 'about',
    header: '_about',
    content: about(),
  });
}
