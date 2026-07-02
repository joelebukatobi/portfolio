import { layoutPage } from '../../partials/layout-page.js';
import { about } from '../../partials/about.js';

export function aboutMeta() {
  return {
    title: 'About | Joel Ebuka Tobi',
    url: 'https://www.joelebukatobi.dev/about',
  };
}

export function aboutContent() {
  return layoutPage({
    activePage: 'about',
    header: '_about',
    content: about(),
  });
}
