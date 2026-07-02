import { contactContent, contactMeta } from '../templates/pages/contact/index.js';
import { successPartial } from '../templates/partials/success.js';
import { renderAppPage, renderAppFragment } from '../render.js';

class ContactController {
  async show(request, reply) {
    return renderAppPage(request, reply, contactMeta(), contactContent());
  }

  async submit(request, reply) {
    // Backend email handler assumed — return success partial for HTMX swap
    return renderAppFragment(reply, successPartial());
  }
}

export const contactController = new ContactController();
