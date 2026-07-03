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
}
