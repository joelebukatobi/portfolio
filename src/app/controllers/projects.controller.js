import { projectsContent, projectsMeta } from '../templates/pages/projects/index.js';
import { renderAppPage } from '../render.js';
import { getApiUrl, fetchProjects } from '../utils/api.js';

class ProjectsController {
  async index(request, reply) {
    const projects = await fetchProjects(request.server);

    return renderAppPage(
      request,
      reply,
      projectsMeta(),
      projectsContent({ projects, apiUrl: getApiUrl() }),
    );
  }
}

export const projectsController = new ProjectsController();
