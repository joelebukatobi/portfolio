import { createRequire } from 'module';
import { testConnection } from '../db/index.js';
import { areBootMigrationsOk } from '../db/run-migrations.js';
import { getAssetVersion } from './asset-version.js';

const require = createRequire(import.meta.url);

const REQUIRED_PACKAGES = ['fastify', 'mysql2', 'drizzle-orm', 'zod'];

function checkDependencies() {
  for (const pkg of REQUIRED_PACKAGES) {
    try {
      require.resolve(pkg);
    } catch {
      return false;
    }
  }
  return true;
}

function migrationCheckStatus() {
  if (process.env.RUN_MIGRATIONS_ON_BOOT === 'false') {
    return 'skipped';
  }
  return areBootMigrationsOk() ? 'ok' : 'error';
}

export async function buildHealthReport() {
  const dependenciesOk = checkDependencies();
  const databaseOk = process.env.DATABASE_URL
    ? await testConnection({ quiet: true })
    : false;
  const migrations = migrationCheckStatus();

  const checks = {
    database: databaseOk ? 'ok' : 'error',
    dependencies: dependenciesOk ? 'ok' : 'error',
    migrations,
  };

  const healthy = checks.database === 'ok'
    && checks.dependencies === 'ok'
    && (checks.migrations === 'ok' || checks.migrations === 'skipped');

  return {
    status: healthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    memoryMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    build: {
      assetVersion: getAssetVersion(),
    },
    checks,
  };
}
