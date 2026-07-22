import {
  blogIndexContent,
  blogIndexMeta,
} from '../templates/pages/blog/index.js';
import {
  blogPostContent,
  blogPostMeta,
} from '../templates/pages/blog/post.js';
import {
  notFoundContent,
  notFoundMeta,
} from '../templates/pages/not-found.js';
import { buildNotFoundContext } from '../utils/not-found-context.js';
import {
  blogCategoryContent,
  blogCategoryMeta,
} from '../templates/pages/blog/category.js';
import { renderAppPage } from '../render.js';
import {
  fetchPosts,
  fetchPostBySlug,
  fetchPostComments,
  fetchCategories,
  fetchCategoryPosts,
  fetchTags,
  fetchPostYears,
  getApiUrl,
} from '../utils/api.js';
import { isSettingEnabled } from '../../services/settings.service.js';

class BlogController {
  async index(request, reply) {
    const page = parseInt(request.query?.page, 10) || 1;
    const { category, tag, year, search } = request.query || {};
    const filters = {
      category: category || '',
      tag: tag || '',
      year: year || '',
      search: search || '',
    };
    const hasFilters = Boolean(filters.category || filters.tag || filters.year || filters.search);

    const [{ posts, meta }, categories, tags, years] = await Promise.all([
      fetchPosts(request.server, {
        page,
        limit: 10,
        category: filters.category || undefined,
        tag: filters.tag || undefined,
        year: filters.year || undefined,
        search: filters.search || undefined,
      }),
      fetchCategories(request.server),
      fetchTags(request.server),
      fetchPostYears(request.server),
    ]);

    return renderAppPage(
      request,
      reply,
      blogIndexMeta({ page, lastPage: meta.last_page || 1, hasFilters }),
      blogIndexContent({ posts, meta, categories, tags, years, filters }),
    );
  }

  async show(request, reply) {
    const { slug } = request.params;
    const { ok, post } = await fetchPostBySlug(request.server, slug, { cookie: request.headers.cookie });

    if (!ok || !post) {
      reply.code(404);
      return renderAppPage(
        request,
        reply,
        notFoundMeta(),
        notFoundContent({ path: `/blog/${slug}`, context: buildNotFoundContext(request) }),
      );
    }

    const siteMap = request.siteSettingsMap ?? {};
    const commentsEnabled = isSettingEnabled(siteMap.enableComments);
    const moderateComments = isSettingEnabled(siteMap.moderateComments);
    const { comments } = commentsEnabled
      ? await fetchPostComments(request.server, slug)
      : { comments: [] };

    return renderAppPage(
      request,
      reply,
      blogPostMeta({ post, apiUrl: getApiUrl() }),
      blogPostContent({
        post,
        apiUrl: getApiUrl(),
        comments,
        commentsEnabled,
        moderateComments,
        siteSettings: siteMap,
      }),
    );
  }

  async category(request, reply) {
    const { category: categorySlug } = request.params;
    const [categoryResult, categories] = await Promise.all([
      fetchCategoryPosts(request.server, categorySlug),
      fetchCategories(request.server),
    ]);

    if (!categoryResult.ok || !categoryResult.category) {
      reply.code(404);
      return renderAppPage(
        request,
        reply,
        notFoundMeta(),
        notFoundContent({ path: `/blog/category/${categorySlug}`, context: buildNotFoundContext(request) }),
      );
    }

    return renderAppPage(
      request,
      reply,
      blogCategoryMeta({ category: categoryResult.category }),
      blogCategoryContent({
        posts: categoryResult.posts,
        category: categoryResult.category,
        categories,
      }),
    );
  }
}

export const blogController = new BlogController();
