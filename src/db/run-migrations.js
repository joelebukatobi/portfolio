// src/db/run-migrations.js
// Runs Drizzle migrations at application startup.
// Drizzle's migrate() is idempotent, and a MySQL advisory lock ensures only one
// process migrates at a time when Passenger spawns multiple workers.
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_FOLDER = path.join(__dirname, 'migrations');
const LOCK_NAME = 'blogcms_migrations';
const LOCK_TIMEOUT_SECONDS = 60;

let bootMigrationsOk = false;
let bootMigrationsError = null;

export function areBootMigrationsOk() {
  return bootMigrationsOk;
}

export function getBootMigrationsError() {
  return bootMigrationsError;
}

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required to run migrations');
  }

  const connection = await mysql.createConnection(process.env.DATABASE_URL);

  try {
    const [[{ locked }]] = await connection.query(
      'SELECT GET_LOCK(?, ?) AS locked',
      [LOCK_NAME, LOCK_TIMEOUT_SECONDS]
    );

    if (locked !== 1) {
      // Another process is migrating (or holds the lock). It will apply the
      // pending migrations, so this process can continue booting.
      console.log('Migrations: another process holds the lock, skipping');
      bootMigrationsOk = true;
      return;
    }

    try {
      const db = drizzle(connection);
      await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
      console.log('Migrations: up to date');
      bootMigrationsOk = true;
      bootMigrationsError = null;
    } catch (err) {
      bootMigrationsOk = false;
      bootMigrationsError = err.message;
      throw err;
    } finally {
      await connection.query('SELECT RELEASE_LOCK(?)', [LOCK_NAME]);
    }
  } finally {
    await connection.end();
  }
}
