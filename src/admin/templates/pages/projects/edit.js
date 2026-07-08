// src/admin/templates/pages/projects/edit.js
import { escapeHtml } from '../../utils/helpers.js';

export function projectEditContent({ project, user, errors = {} }) {
  const content = `
    <div class="projects">
      <div class="content">
        <div class="page-header">
          <div class="page-header__left">
            <h1 class="page-header__title">Edit Project</h1>
            <p class="page-header__subtitle">Update project details</p>
          </div>
          <div class="page-header__toast-container"></div>
        </div>

        <div class="card">
          <div class="card__header">
            <h2>Project Details</h2>
          </div>
        <div class="card__body">
          <form
            class="form"
            id="editProjectForm"
            novalidate
            hx-put="/admin/projects/${project.id}"
            hx-target="#form-response"
            hx-swap="innerHTML"
          >
            <div id="form-response"></div>

            <div class="form__group ${errors.name ? 'form__group--error' : ''}">
              <label class="label label--required" for="projectName">Name</label>
              <input
                type="text"
                class="input"
                id="projectName"
                name="name"
                value="${escapeHtml(project.name)}"
                required
              />
              ${errors.name ? `<p class="form-feedback form-feedback--error">${errors.name}</p>` : ''}
            </div>

            <div class="form__group ${errors.description ? 'form__group--error' : ''}">
              <label class="label label--required" for="projectDescription">Description</label>
              <textarea
                class="textarea"
                id="projectDescription"
                name="description"
                rows="4"
                required
              >${escapeHtml(project.description)}</textarea>
              ${errors.description ? `<p class="form-feedback form-feedback--error">${errors.description}</p>` : ''}
            </div>

            <div class="form__group ${errors.technologies ? 'form__group--error' : ''}">
              <label class="label label--required" for="projectTechnologies">Technologies</label>
              <input
                type="text"
                class="input"
                id="projectTechnologies"
                name="technologies"
                value="${escapeHtml(project.technologies)}"
                required
              />
              ${errors.technologies ? `<p class="form-feedback form-feedback--error">${errors.technologies}</p>` : ''}
            </div>

            <div class="form__group ${errors.website ? 'form__group--error' : ''}">
              <label class="label" for="projectWebsite">Website</label>
              <input
                type="url"
                class="input"
                id="projectWebsite"
                name="website"
                value="${escapeHtml(project.website || '')}"
              />
              ${errors.website ? `<p class="form-feedback form-feedback--error">${errors.website}</p>` : ''}
            </div>

            <input type="hidden" name="_csrf" value="${user?.csrfToken || ''}" />
          </form>
        </div>
        <div class="card__footer">
          <div class="form__field-group">
            <button type="button" class="btn btn--primary" onclick="submitForm()">
              Save
            </button>
            <a href="/admin/projects" class="btn btn--outline btn--cancel">Cancel</a>
          </div>
        </div>
      </div>
    </div>

    <script>
      function submitForm() {
        htmx.trigger('#editProjectForm', 'submit');
      }
    </script>
  `;

  return content;
}

export function projectEditMeta({ project }) {
  return {
    title: 'Edit Project',
    description: 'Edit project',
    activeRoute: '/admin/projects',
    breadcrumbs: [
      { label: 'Dashboard', url: '/admin' },
      { label: 'Projects', url: '/admin/projects' },
      { label: project.name, url: `/admin/projects/${project.id}/edit` },
    ],
  };
}
