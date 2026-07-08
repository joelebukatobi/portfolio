// src/admin/routes/projects.routes.js
import { projectsController } from '../controllers/projects.controller.js';
import { requireAuthRedirect } from '../../middleware/authenticate.js';
import { validateBody, validateParams, validateQuery } from '../middleware/validate.js';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema.js';
import { listQuerySchema, resourceIdSchema } from '../schemas/common.schema.js';

const auth = requireAuthRedirect('/admin/auth/login');

export default async function projectRoutes(fastify) {
  fastify.get('/', {
    preHandler: [auth, validateQuery(listQuerySchema)],
    handler: projectsController.list.bind(projectsController),
  });

  fastify.get('/new', {
    preHandler: auth,
    handler: projectsController.showNewForm.bind(projectsController),
  });

  fastify.post('/', {
    preHandler: [auth, validateBody(createProjectSchema)],
    handler: projectsController.create.bind(projectsController),
  });

  fastify.get('/:id/edit', {
    preHandler: [auth, validateParams(resourceIdSchema)],
    handler: projectsController.showEditForm.bind(projectsController),
  });

  fastify.put('/:id', {
    preHandler: [auth, validateParams(resourceIdSchema), validateBody(updateProjectSchema)],
    handler: projectsController.update.bind(projectsController),
  });

  fastify.delete('/:id', {
    preHandler: [auth, validateParams(resourceIdSchema)],
    handler: projectsController.delete.bind(projectsController),
  });
}
