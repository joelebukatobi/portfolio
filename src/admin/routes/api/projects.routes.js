// src/admin/routes/api/projects.routes.js
// Public API routes for projects

import { projectsAPIController } from '../../controllers/api/projects.controller.js';

export default async function projectsAPIRoutes(fastify) {
  fastify.get('/', {
    handler: projectsAPIController.list.bind(projectsAPIController),
  });
}
