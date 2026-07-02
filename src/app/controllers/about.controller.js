import { aboutContent, aboutMeta } from '../templates/pages/about/index.js';
import { renderAppPage } from '../render.js';

class AboutController {
  async index(request, reply) {
    return renderAppPage(
      request,
      reply,
      aboutMeta(),
      aboutContent(),
    );
  }
}

export const aboutController = new AboutController();
