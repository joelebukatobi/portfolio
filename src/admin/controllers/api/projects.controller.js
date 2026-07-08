// src/admin/controllers/api/projects.controller.js
// Public API controller for projects

import { projectsService } from '../../../services/projects.service.js';

function formatProjectForAPI(project) {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    technologies: project.technologies,
    website: project.website || null,
    created_at: project.createdAt?.toISOString() || null,
    updated_at: project.updatedAt?.toISOString() || null,
  };
}

class ProjectsAPIController {
  /** GET /api/v1/projects */
  async list(request, reply) {
    try {
      const { data } = await projectsService.getAll({ limit: 100, sortBy: 'createdAt', sortOrder: 'desc' });

      return reply.send({
        data: data.map(formatProjectForAPI),
      });
    } catch (error) {
      request.log.error(error);
      reply.code(500);
      return reply.send({
        statusCode: 500,
        error: 'Internal Server Error',
        message: 'Failed to fetch projects',
      });
    }
  }
}

export const projectsAPIController = new ProjectsAPIController();
export default projectsAPIController;
