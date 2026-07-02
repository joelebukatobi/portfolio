import { projectsContent, projectsMeta } from '../templates/pages/projects/index.js';
import { renderAppPage } from '../render.js';
import { getApiUrl } from '../utils/api.js';
import { PLACEHOLDER_PROJECTS } from '../data/placeholders.js';

class ProjectsController {
  async index(request, reply) {
    const projects = [...PLACEHOLDER_PROJECTS, ...PLACEHOLDER_PROJECTS];

    return renderAppPage(
      request,
      reply,
      projectsMeta(),
      projectsContent({ projects, apiUrl: getApiUrl() }),
    );
  }
}

export const projectsController = new ProjectsController();
