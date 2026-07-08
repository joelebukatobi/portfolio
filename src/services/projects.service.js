// src/services/projects.service.js
// Projects service for managing portfolio project entries

import { db, projects } from '../db/index.js';
import { eq, like, desc, asc, sql } from 'drizzle-orm';

class ProjectsService {
  /**
   * Get all projects with optional filtering and pagination
   * @param {Object} options
   * @param {string} [options.search] - Search by name
   * @param {string} [options.sortBy='createdAt']
   * @param {string} [options.sortOrder='desc']
   * @param {number} [options.page=1]
   * @param {number} [options.limit=10]
   * @returns {Promise<Object>} - Projects and pagination info
   */
  async getAll({
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = {}) {
    const conditions = [];

    if (search) {
      conditions.push(like(projects.name, `%${search}%`));
    }

    let countQuery = db.select({ count: sql`count(*)` }).from(projects);
    if (conditions.length > 0) {
      countQuery = countQuery.where(...conditions);
    }
    const [{ count }] = await countQuery;
    const total = Number(count);

    let query = db.select().from(projects);
    if (conditions.length > 0) {
      query = query.where(...conditions);
    }

    const sortField = sortBy === 'name' ? projects.name : projects.createdAt;
    query = sortOrder === 'asc' ? query.orderBy(asc(sortField)) : query.orderBy(desc(sortField));

    const offset = (page - 1) * limit;
    query = query.limit(limit).offset(offset);

    const data = await query;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  async getById(id) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || null;
  }

  /**
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async create(data) {
    await db.insert(projects).values({
      name: data.name,
      description: data.description,
      technologies: data.technologies,
      website: data.website || null,
    });

    const [project] = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(1);

    return project;
  }

  /**
   * @param {string} id
   * @param {Object} data
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const existing = await this.getById(id);
    if (!existing) {
      throw new Error('Project not found');
    }

    await db
      .update(projects)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(projects.id, id));

    return this.getById(id);
  }

  /**
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const project = await this.getById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    await db.delete(projects).where(eq(projects.id, id));

    return { deleted: true };
  }

  /**
   * @returns {Promise<Object>}
   */
  async getCounts() {
    const [{ count }] = await db.select({ count: sql`count(*)` }).from(projects);
    return { total: Number(count) };
  }
}

export const projectsService = new ProjectsService();
export default projectsService;
