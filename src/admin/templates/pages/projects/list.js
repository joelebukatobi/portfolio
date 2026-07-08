// src/admin/templates/pages/projects/list.js
import { DeleteModal } from '../../components/delete-modal.js';
import { listToolbar } from '../../partials/list-toolbar.js';
import { escapeHtml, formatDate, paginationHtml, toastQueryScript } from '../../utils/helpers.js';

export function projectsListContent({ projects, total, page, totalPages, filters, user, toast }) {
  const toastScript = toastQueryScript(toast, {
    created: 'Project created successfully!',
    deleted: 'Project deleted successfully!',
  });

  const content = `
    <div class="projects">
      <div class="content">
        <div class="page-header">
          <div class="page-header__left">
            <h1 class="page-header__title">Projects</h1>
            <p class="page-header__subtitle">Manage the projects shown on your public portfolio</p>
          </div>
          <div class="page-header__toast-container"></div>
        </div>

        ${listToolbar({
          searchUrl: '/admin/projects',
          searchTarget: '#projects-table-container',
          searchPlaceholder: 'Search projects...',
          searchValue: filters.search || '',
          filters: [],
          hasAddButton: true,
          addButtonUrl: '/admin/projects/new',
          addButtonText: projects.length === 0 ? 'Create First Project' : 'New Project',
        })}

        <div id="projects-table-container" class="projects__table-content">
        ${
          projects.length === 0
            ? emptyState()
            : `
          <table class="table">
              <thead class="table__thead">
                <tr>
                  <th>Name</th>
                  <th>Technologies</th>
                  <th>Website</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody class="table__tbody">
                ${projects
                  .map(
                    (project) => `
                  <tr class="table__tr">
                    <td class="table__td">
                      <span class="table__label">Name</span>
                      <div class="table__title">
                        <a href="/admin/projects/${project.id}/edit">${escapeHtml(project.name)}</a>
                      </div>
                    </td>

                    <td class="table__td">
                      <span class="table__label">Technologies</span>
                      <div>${escapeHtml(project.technologies)}</div>
                    </td>

                    <td class="table__td">
                      <span class="table__label">Website</span>
                      <div>${project.website ? `<a href="${escapeHtml(project.website)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.website)}</a>` : '-'}</div>
                    </td>

                    <td class="table__td">
                      <span class="table__label">Date</span>
                      ${formatDate(project.createdAt)}
                    </td>

                    <td class="table__td table__td--actions">
                      <div class="row-actions">
                        <a href="/admin/projects/${project.id}/edit" class="btn btn--ghost row-action row-action--edit">
                          <i data-lucide="pencil"></i>
                          <span>Edit</span>
                        </a>
                        <button
                          type="button"
                          class="btn btn--ghost row-action row-action--delete"
                          data-project-id="${project.id}"
                          data-project-title="${escapeHtml(project.name)}"
                          onclick="openDeleteModal(this)"
                        >
                          <i data-lucide="trash-2"></i>
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                `,
                  )
                  .join('')}
              </tbody>
            </table>
        `}
        </div>

        ${totalPages > 1 ? paginationHtml({ basePath: '/admin/projects', page, totalPages, filters, filterKeys: ['search'] }) : ''}
      </div>
    </div>

    ${toastScript}
  `;

  return content;
}

export function projectsListModals({ user }) {
  const deleteModal = new DeleteModal({
    entityName: 'Project',
    entityLabel: 'title',
    deleteUrlPath: '/admin/projects',
    csrfToken: user?.csrfToken || '',
  });

  return deleteModal.render();
}

export function projectsListMeta({ user }) {
  return {
    title: 'Projects',
    description: 'Manage your portfolio projects',
    activeRoute: '/admin/projects',
    breadcrumbs: [
      { label: 'Dashboard', url: '/admin' },
      { label: 'Projects', url: '/admin/projects' },
    ],
    modals: projectsListModals({ user }),
  };
}

export function projectsTableFragment({ projects, pagination }) {
  if (!projects || projects.length === 0) {
    return `
      <div class="empty">
        <h3>No projects found</h3>
        <p>Get started by creating your first project.</p>
      </div>
    `;
  }

  const rows = projects.map((project) => {
    const date = new Date(project.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `
      <tr class="table__tr">
        <td class="table__td">
          <span class="table__label">Name</span>
          <div class="table__title">
            <a href="/admin/projects/${project.id}/edit">${project.name}</a>
          </div>
        </td>
        <td class="table__td">
          <span class="table__label">Technologies</span>
          <div>${project.technologies}</div>
        </td>
        <td class="table__td">
          <span class="table__label">Website</span>
          <div>${project.website ? `<a href="${project.website}" target="_blank" rel="noopener noreferrer">${project.website}</a>` : '-'}</div>
        </td>
        <td class="table__td">
          <span class="table__label">Date</span>
          ${date}
        </td>
        <td class="table__td table__td--actions">
          <div class="flex items-center justify-end gap-[1.6rem] lg:gap-[0.64rem]">
            <a href="/admin/projects/${project.id}/edit" class="btn btn--ghost row-action row-action--edit">
              <i data-lucide="pencil" class="h-[1.4rem] w-[1.4rem] lg:h-[1.2rem] lg:w-[1.2rem]"></i>
              <span class="lg:hidden">Edit</span>
            </a>
            <button
              type="button"
              class="btn btn--ghost row-action row-action--delete"
              data-project-id="${project.id}"
              data-project-title="${project.name}"
              onclick="openDeleteModal(this)"
            >
              <i data-lucide="trash-2" class="h-[1.4rem] w-[1.4rem] lg:h-[1.2rem] lg:w-[1.2rem]"></i>
              <span class="lg:hidden">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  const paginationFragment = pagination && pagination.totalPages > 1
    ? paginationHtml({
        basePath: '/admin/projects',
        page: pagination.page,
        totalPages: pagination.totalPages,
        filters: {},
        filterKeys: ['search'],
      })
    : '';

  return `
    <table class="table">
      <thead class="table__thead">
        <tr>
          <th>Name</th>
          <th>Technologies</th>
          <th>Website</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody class="table__tbody">
        ${rows}
      </tbody>
    </table>
    ${paginationFragment}
  `;
}

function emptyState() {
  return `
    <div class="empty">
      <h3>No projects yet</h3>
      <p>Add your first project to show it on your public portfolio</p>
    </div>
  `;
}
