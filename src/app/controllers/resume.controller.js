import { resumeContent, resumeMeta } from '../templates/pages/resume/index.js';
import { renderAppPage } from '../render.js';

class ResumeController {
  async index(request, reply) {
    return renderAppPage(request, reply, resumeMeta(), resumeContent());
  }
}

export const resumeController = new ResumeController();
