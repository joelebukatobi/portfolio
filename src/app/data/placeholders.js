/** Site logo used as thumbnail fallback for project placeholders */
export const PLACEHOLDER_IMAGE = '/images/icons/favicon.svg';

export const PLACEHOLDER_PROJECTS = [
  {
    id: 1,
    name: 'all fields global',
    description: 'A global agriculture and logistics platform for field operations and supply chain visibility.',
    technologies: 'wintercms - laravel - bootstrap',
    website: 'https://www.joelebukatobi.dev',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    name: 'xpathedge',
    description: 'A modern web platform for remote teams with dashboards, workflows, and client portals.',
    technologies: 'laravel - alpinejs - bootstrap - mysql',
    website: 'https://www.joelebukatobi.dev',
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    name: 'santis-med',
    description: 'A healthcare services site focused on patient intake, appointments, and provider information.',
    technologies: 'mysql - tailwindcss - alpinejs',
    website: 'https://www.joelebukatobi.dev',
    image: PLACEHOLDER_IMAGE,
  },
];

export const PLACEHOLDER_POSTS = [
  {
    id: 1,
    slug: 'git-workflow-connecting-through-ssh',
    title: 'git workflow: connecting through ssh',
    description:
      'A practical walkthrough for generating SSH keys, adding them to GitHub, and configuring remotes so pushes and pulls work smoothly across machines.',
  },
  {
    id: 2,
    slug: 'building-scalable-graphql-apis',
    title: 'building scalable graphql apis',
    description:
      'Design patterns for schema design, resolver performance, and caching strategies when building GraphQL APIs that need to scale with traffic.',
  },
  {
    id: 3,
    slug: 'frontend-performance-checklist',
    title: 'frontend performance checklist',
    description:
      'A concise checklist for auditing bundle size, image delivery, font loading, and critical rendering path issues on production sites.',
  },
];

/**
 * Use placeholders when live data is empty (styling/dev preview without APIs).
 * @param {Array} items
 * @param {Array} fallback
 */
export function withPlaceholders(items, fallback) {
  return items?.length ? items : fallback;
}
