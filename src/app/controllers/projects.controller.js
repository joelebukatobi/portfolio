import { projectsContent, projectsMeta } from '../templates/pages/projects/index.js';
import { renderAppPage } from '../render.js';
import { getApiUrl, fetchProjects } from '../utils/api.js';
import { PLACEHOLDER_PROJECTS, withPlaceholders } from '../data/placeholders.js';

class ProjectsController {
  async index(request, reply) {
    const realProjects = await fetchProjects(request.server);
    const projects = withPlaceholders(realProjects, PLACEHOLDER_PROJECTS);

    return renderAppPage(
      request,
      reply,
      projectsMeta(),
      projectsContent({ projects, apiUrl: getApiUrl() }),
    );
  }
}

export const projectsController = new ProjectsController();
