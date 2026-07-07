import { ensureDatabaseUrl } from '../../../env.js';
import mysql from 'mysql2/promise';

/**
 * Drops every table in the target database so the next app boot's
 * runMigrations() applies all migrations cleanly from scratch.
 *
 * For genuinely fresh/first-install environments only — e.g. when a
 * database ended up with some schema changes applied outside of
 * Drizzle's migration tracking (a manual `db:push`, a partial/crashed
 * migration run), causing `runMigrations()` to fail with duplicate
 * column/table errors on every boot. Always a deliberate, explicit
 * action — never run automatically by a deploy pipeline.
 *
 * @param {string[]} args
 */
export async function resetFreshInstall(args = []) {
  if (!args.includes('--yes')) {
    throw new Error(
      'Refusing to drop all tables without --yes. Only run this against a database ' +
      'you know is a fresh/first install with no real data — this is irreversible.'
    );
  }

  ensureDatabaseUrl({ scriptName: 'cli bootstrap fresh-install' });

  const target = new URL(process.env.DATABASE_URL);
  console.log(`Target database: ${target.hostname}${target.pathname}`);

  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    const [rows] = await connection.query('SHOW TABLES');
    const tableNames = rows.map((row) => Object.values(row)[0]);

    if (tableNames.length === 0) {
      console.log('No tables found — database is already empty.');
      return;
    }

    console.log(`Dropping ${tableNames.length} table(s): ${tableNames.join(', ')}`);

    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    for (const table of tableNames) {
      await connection.query(`DROP TABLE \`${table}\``);
    }
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('All tables dropped. Migrations will run fresh on the next app boot.');
  } finally {
    await connection.end();
  }
}
