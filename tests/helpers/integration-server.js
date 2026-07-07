import Fastify from 'fastify';
import app from '../../src/app.js';
import { runMigrations } from '../../src/db/run-migrations.js';

/**
 * Boot the app the way server.js does before tests that hit /health or the DB.
 * Vitest loads app.js directly, so boot migrations must run explicitly.
 */
export async function createIntegrationServer() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required for integration tests. Check .env.development or .env.local.');
  }

  await runMigrations();

  const server = Fastify({ logger: false });
  await server.register(app);
  return server;
}
