// src/admin/controllers/projects.controller.js
// Projects controller - handles admin project HTTP requests

import { projectsService } from '../../services/projects.service.js';
import {
  renderAdminPage,
  renderFragment,
  renderEmpty,
  errorAlert,
  htmxRedirect,
  setHtmxToast,
} from '../render.js';

class ProjectsController {
  /** GET /admin/projects */
  async list(request, reply) {
    try {
      const {
        search,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        page = 1,
        toast,
      } = request.query;

      const { data: projects, pagination } = await projectsService.getAll({
        search,
        sortBy,
        sortOrder,
        page: parseInt(page, 10) || 1,
        limit: 10,
      });

      const counts = await projectsService.getCounts();

      const {
        projectsListContent,
        projectsListMeta,
        projectsTableFragment,
      } = await import('../templates/pages/projects/index.js');

      if (request.headers['hx-request'] === 'true') {
        return renderFragment(reply, projectsTableFragment({ projects, pagination }));
      }

      return renderAdminPage(
        request,
        reply,
        projectsListMeta({ user: request.user }),
        projectsListContent({
          user: request.user,
          projects,
          total: pagination.total,
          page: pagination.page,
          totalPages: pagination.totalPages,
          counts,
          filters: { search },
          toast,
        }),
      );
    } catch (error) {
      request.log.error(error);
      reply.code(500);
      return renderFragment(reply, errorAlert({ message: 'Failed to load projects.' }));
    }
  }

  /** GET /admin/projects/new */
  async showNewForm(request, reply) {
    try {
      const { projectNewContent, projectNewMeta } = await import('../templates/pages/projects/index.js');

      return renderAdminPage(
        request,
        reply,
        projectNewMeta(),
        projectNewContent({ user: request.user }),
      );
    } catch (error) {
      request.log.error(error);
      reply.code(500);
      return renderFragment(reply, errorAlert({ message: 'Failed to load form.' }));
    }
  }

  /** POST /admin/projects */
  async create(request, reply) {
    try {
      const { name, description, technologies, website } = request.body;

      await projectsService.create({ name, description, technologies, website });

      const redirectUrl = '/admin/projects?toast=created';
      if (request.headers['hx-request'] !== 'true') {
        return reply.redirect(redirectUrl);
      }
      return htmxRedirect(reply, redirectUrl);
    } catch (error) {
      request.log.error(error);
      reply.code(400);
      return renderFragment(reply, errorAlert({
        message: error.message || 'Failed to create project.',
      }));
    }
  }

  /** GET /admin/projects/:id/edit */
  async showEditForm(request, reply) {
    try {
      const { id } = request.params;
      const project = await projectsService.getById(id);

      if (!project) {
        reply.code(404);
        return renderFragment(reply, errorAlert({ message: 'Project not found.' }));
      }

      const { projectEditContent, projectEditMeta } = await import('../templates/pages/projects/index.js');

      return renderAdminPage(
        request,
        reply,
        projectEditMeta({ project }),
        projectEditContent({ user: request.user, project }),
      );
    } catch (error) {
      request.log.error(error);
      reply.code(500);
      return renderFragment(reply, errorAlert({ message: 'Failed to load project.' }));
    }
  }

  /** PUT /admin/projects/:id */
  async update(request, reply) {
    try {
      const { id } = request.params;
      const { name, description, technologies, website } = request.body;

      const existing = await projectsService.getById(id);
      if (!existing) {
        reply.code(404);
        return renderFragment(reply, errorAlert({ message: 'Project not found.' }));
      }

      await projectsService.update(id, { name, description, technologies, website });

      return renderEmpty(setHtmxToast(reply, { message: 'Project updated successfully!' }));
    } catch (error) {
      request.log.error(error);
      reply.code(400);
      return renderFragment(reply, errorAlert({
        message: error.message || 'Failed to update project.',
      }));
    }
  }

  /** DELETE /admin/projects/:id */
  async delete(request, reply) {
    try {
      const { id } = request.params;

      await projectsService.delete(id);

      return htmxRedirect(reply, '/admin/projects?toast=deleted');
    } catch (error) {
      request.log.error(error);
      reply.code(400);
      return renderFragment(reply, errorAlert({
        message: error.message || 'Failed to delete project.',
      }));
    }
  }
}

export const projectsController = new ProjectsController();
export default projectsController;
