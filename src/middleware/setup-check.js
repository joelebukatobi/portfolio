// src/middleware/setup-check.js
// Detects if the application needs setup (no users exist)
// Redirects all public traffic to /coming-soon until setup is complete

import { sql } from 'drizzle-orm';

export async function checkSetupStatus(fastify) {
  fastify.addHook('onRequest', async (request, reply) => {
    const pathname = request.url.split('?')[0];

    // Skip check for static assets and API routes
    if (pathname.startsWith('/dist/') ||
        pathname.startsWith('/vendor/') ||
        pathname.startsWith('/public/') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/health') ||
        pathname.startsWith('/admin/auth/') ||
        pathname === '/favicon.ico' ||
        pathname === '/favicon.svg' ||
        pathname === '/images/icons/favicon.svg') {
      return;
    }

    // Setup wizard must remain reachable before the first user exists
    if (pathname.startsWith('/setup')) {
      return;
    }

    try {
      const { db, users } = await import('../db/index.js');

      const [result] = await db.select({ count: sql`count(*)` }).from(users);
      const userCount = Number(result.count);

      if (userCount === 0) {
        if (pathname === '/coming-soon') {
          return;
        }

        return reply.redirect('/coming-soon');
      }
    } catch (error) {
      fastify.log.error('Setup check error:', error);
      throw error;
    }
  });
}
