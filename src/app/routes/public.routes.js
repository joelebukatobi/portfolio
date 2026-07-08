import { aboutController } from '../controllers/about.controller.js';
import { projectsController } from '../controllers/projects.controller.js';
import { resumeController } from '../controllers/resume.controller.js';
import { blogController } from '../controllers/blog.controller.js';
import { contactController } from '../controllers/contact.controller.js';
import { validateParams, validateQuery } from '../../admin/middleware/validate.js';
import { blogListQuerySchema, slugParamSchema } from '../../admin/schemas/common.schema.js';
import { buildComingSoonShell } from '../templates/layouts/portfolio.js';
import { comingSoonContent } from '../../admin/templates/pages/coming-soon.js';
import { renderComingSoonPage } from '../render.js';
import { fetchPosts, fetchCategories } from '../utils/api.js';

const SITE_URL = 'https://joelebukatobi.dev';
const STATIC_SITEMAP_PATHS = ['/', '/about', '/projects', '/resume', '/contact'];

export default async function publicRoutes(fastify) {
  fastify.get('/', {
    preHandler: validateQuery(blogListQuerySchema),
    handler: blogController.index.bind(blogController),
  });

  fastify.get('/about', aboutController.index.bind(aboutController));
  fastify.get('/projects', projectsController.index.bind(projectsController));
  fastify.get('/resume', resumeController.index.bind(resumeController));

  fastify.get('/blog', async (request, reply) => {
    const query = request.url.includes('?') ? request.url.slice(request.url.indexOf('?')) : '';
    return reply.redirect(query ? `/${query}` : '/');
  });

  fastify.get('/blog/category/:category', {
    handler: blogController.category.bind(blogController),
  });

  fastify.get('/blog/:slug', {
    preHandler: validateParams(slugParamSchema),
    handler: blogController.show.bind(blogController),
  });

  fastify.get('/contact', contactController.show.bind(contactController));
  fastify.post('/contact', contactController.submit.bind(contactController));

  fastify.get('/coming-soon', async (_request, reply) => {
    return renderComingSoonPage(
      reply,
      buildComingSoonShell({ content: comingSoonContent() }),
    );
  });

  fastify.get('/robots.txt', async (_request, reply) => {
    reply.type('text/plain');
    return [
      'User-agent: *',
      'Disallow: /admin',
      'Disallow: /setup',
      '',
      `Sitemap: ${SITE_URL}/sitemap.xml`,
    ].join('\n');
  });

  fastify.get('/sitemap.xml', async (_request, reply) => {
    const [{ posts }, categories] = await Promise.all([
      fetchPosts(fastify, { limit: 100, page: 1 }),
      fetchCategories(fastify),
    ]);

    const urls = [
      ...STATIC_SITEMAP_PATHS.map((path) => ({ loc: `${SITE_URL}${path}` })),
      ...posts.map((post) => ({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: post.updated_at?.slice(0, 10),
      })),
      ...categories.map((category) => ({ loc: `${SITE_URL}/blog/category/${category.slug}` })),
    ];

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

    reply.type('application/xml');
    return body;
  });
}
