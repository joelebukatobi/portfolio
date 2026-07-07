import { describe, expect, it, vi, beforeEach } from 'vitest';

vi.mock('../../../src/db/index.js', () => ({
  testConnection: vi.fn(),
}));

vi.mock('../../../src/db/run-migrations.js', () => ({
  areBootMigrationsOk: vi.fn(),
}));

vi.mock('../../../src/lib/asset-version.js', () => ({
  getAssetVersion: vi.fn(() => 'abc123'),
}));

import { testConnection } from '../../../src/db/index.js';
import { areBootMigrationsOk } from '../../../src/db/run-migrations.js';
import { buildHealthReport } from '../../../src/lib/health-check.js';

describe('health-check', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DATABASE_URL = 'mysql://user:pass@localhost/db';
    delete process.env.RUN_MIGRATIONS_ON_BOOT;
  });

  it('reports healthy when database, dependencies, and migrations are ok', async () => {
    testConnection.mockResolvedValue(true);
    areBootMigrationsOk.mockReturnValue(true);

    const report = await buildHealthReport();

    expect(report.status).toBe('healthy');
    expect(report.checks).toEqual({
      database: 'ok',
      dependencies: 'ok',
      migrations: 'ok',
    });
    expect(report.build.assetVersion).toBe('abc123');
  });

  it('reports unhealthy when database check fails', async () => {
    testConnection.mockResolvedValue(false);
    areBootMigrationsOk.mockReturnValue(true);

    const report = await buildHealthReport();

    expect(report.status).toBe('unhealthy');
    expect(report.checks.database).toBe('error');
  });
});
