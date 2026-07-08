// src/admin/templates/pages/projects/new.js
export function projectNewContent({ user, errors = {} }) {
  const content = `
    <div class="projects">
      <div class="content">
        <div class="page-header">
          <div class="page-header__left">
            <h1 class="page-header__title">New Project</h1>
            <p class="page-header__subtitle">Add a project to your public portfolio</p>
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
            id="newProjectForm"
            novalidate
            hx-post="/admin/projects"
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
                placeholder="e.g. xPathEdge"
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
                placeholder="A short description of the project..."
                required
              ></textarea>
              ${errors.description ? `<p class="form-feedback form-feedback--error">${errors.description}</p>` : ''}
            </div>

            <div class="form__group ${errors.technologies ? 'form__group--error' : ''}">
              <label class="label label--required" for="projectTechnologies">Technologies</label>
              <input
                type="text"
                class="input"
                id="projectTechnologies"
                name="technologies"
                placeholder="e.g. laravel - alpinejs - bootstrap"
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
                placeholder="https://example.com"
              />
              ${errors.website ? `<p class="form-feedback form-feedback--error">${errors.website}</p>` : ''}
            </div>

            <input type="hidden" name="_csrf" value="${user?.csrfToken || ''}" />
          </form>
        </div>
        <div class="card__footer">
          <div class="form__field-group">
            <button type="button" class="btn btn--primary" onclick="submitForm()">
              Create Project
            </button>
            <a href="/admin/projects" class="btn btn--outline btn--cancel">Cancel</a>
          </div>
        </div>
      </div>
    </div>

    <script>
      function submitForm() {
        htmx.trigger('#newProjectForm', 'submit');
      }
    </script>
  `;

  return content;
}

export function projectNewMeta() {
  return {
    title: 'New Project',
    description: 'Add a new project',
    activeRoute: '/admin/projects',
    breadcrumbs: [
      { label: 'Dashboard', url: '/admin' },
      { label: 'Projects', url: '/admin/projects' },
      { label: 'New Project', url: '/admin/projects/new' },
    ],
  };
}
