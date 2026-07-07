#!/usr/bin/env node
// Minimal rows for CI integration tests — not demo/simulation data.
import { ensureDatabaseUrl } from '../env.js';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db, users } from '../src/db/index.js';
import { settingsService } from '../src/services/settings.service.js';

if (process.env.CI !== 'true' && process.env.ALLOW_CI_FIXTURES !== 'true') {
  console.error('ci-test-fixtures.js only runs in CI (set CI=true or ALLOW_CI_FIXTURES=true).');
  process.exit(1);
}

ensureDatabaseUrl({ scriptName: 'ci-test-fixtures.js' });

const [existingAdmin] = await db
  .select({ id: users.id })
  .from(users)
  .where(eq(users.email, 'admin@example.com'))
  .limit(1);

if (!existingAdmin) {
  const password = await bcrypt.hash('Admin@123', 10);
  await db.insert(users).values({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password,
    role: 'ADMIN',
    status: 'ACTIVE',
  });
  console.log('CI fixtures: admin user created');
} else {
  console.log('CI fixtures: admin user already exists');
}

await settingsService.initializeDefaults();
console.log('CI fixtures: default settings initialized');
