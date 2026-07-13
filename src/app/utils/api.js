export function getApiUrl() {
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';
}

export async function injectJson(server, url, { headers } = {}) {
  const response = await server.inject({ method: 'GET', url, headers });
  if (response.statusCode !== 200) {
    return { ok: false, statusCode: response.statusCode, data: null };
  }
  return { ok: true, statusCode: 200, data: response.json() };
}

export async function fetchPosts(server, {
  page = 1,
  limit = 10,
  category,
  tag,
  year,
  search,
} = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);
  if (year) params.set('year', String(year));
  if (search) params.set('search', search);
  const result = await injectJson(server, `/api/v1/posts?${params}`);
  if (!result.ok) return { posts: [], meta: {} };
  return {
    posts: result.data?.data || [],
    meta: result.data?.meta || {},
  };
}

export async function fetchPostBySlug(server, slug, { cookie } = {}) {
  const result = await injectJson(server, `/api/v1/posts/${encodeURIComponent(slug)}`, {
    headers: cookie ? { cookie } : undefined,
  });
  if (!result.ok) return { ok: false, post: null };
  return { ok: true, post: result.data };
}

export async function fetchPostComments(server, slug, { page = 1, limit = 50 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  const result = await injectJson(server, `/api/v1/posts/${encodeURIComponent(slug)}/comments?${params}`);
  if (!result.ok) return { comments: [], meta: {} };
  return {
    comments: result.data?.data || [],
    meta: result.data?.meta || {},
  };
}

export async function fetchCategories(server) {
  const result = await injectJson(server, `/api/v1/categories`);
  if (!result.ok) return [];
  return result.data?.data || [];
}

export async function fetchTags(server) {
  const result = await injectJson(server, `/api/v1/tags`);
  if (!result.ok) return [];
  return result.data?.data || [];
}

export async function fetchPostYears(server) {
  const result = await injectJson(server, '/api/v1/posts?limit=100&page=1');
  if (!result.ok) return [];
  const years = new Set();
  for (const post of result.data?.data || []) {
    const iso = post.published_at || post.created_at;
    if (iso) years.add(new Date(iso).getFullYear());
  }
  return [...years].sort((a, b) => b - a);
}

export async function fetchCategoryPosts(server, slug, { page = 1, limit = 50 } = {}) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  const result = await injectJson(server, `/api/v1/categories/${encodeURIComponent(slug)}/posts?${params}`);
  if (!result.ok) return { ok: false, category: null, posts: [] };
  return {
    ok: true,
    category: result.data?.category || null,
    posts: result.data?.data || [],
  };
}

export async function fetchProjects(server) {
  const result = await injectJson(server, '/api/v1/projects');
  if (!result.ok) return [];
  return result.data?.data || [];
}
