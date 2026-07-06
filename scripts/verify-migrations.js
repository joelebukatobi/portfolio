#!/usr/bin/env node
import { ensureDatabaseUrl } from '../env.js';
import mysql from 'mysql2/promise';

ensureDatabaseUrl({ scriptName: 'verify-migrations' });

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [cols] = await conn.query("SHOW COLUMNS FROM users LIKE 'totp_%'");
await conn.end();

if (cols.length < 2) {
  console.error('Expected totp_secret and totp_enabled columns after migration');
  process.exit(1);
}

console.log('Migration verify: users.totp_* columns present');
