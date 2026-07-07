#!/usr/bin/env node
/**
 * Unified CLI for maintenance tasks.
 */

import { assertLocalDevelopment } from './lib/local-dev-only.js';

const HELP = `
Maintenance CLI

  db
    test                  Test database connection
    recalculate-counts    Recalculate category post counts

  setup-token [--json]    Generate first-launch setup URL

  bootstrap
    fresh-install --yes   Drop all tables so migrations run clean (DESTRUCTIVE — first install only)

  analytics
    day [flags]           Simulate daily analytics (local development only)
    run                   Run one day of the 7-day simulation engine (local only)
    aggregate             Legacy aggregate command (local only)
    scheduler             Cron scheduler for analytics run (local only)

  media
    thumbnails [--regenerate]
    clear                 Remove seeded images (keeps source files)
    cleanup               Keep only 2 most recent image records

  maintenance
    reset-password [--email=] [--password=]
    update-views          Randomize post view counts (local development only)
    update-colors         Reset category badge colors
`.trim();

async function run(handler, args = []) {
  try {
    await handler(args);
    if (handler.name !== 'runScheduler') {
      process.exit(0);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

async function main() {
  const [command, subcommand, ...rest] = process.argv.slice(2);
  const args = subcommand?.startsWith('--') ? [subcommand, ...rest] : rest;

  if (!command || command === 'help' || command === '--help') {
    console.log(HELP);
    process.exit(0);
  }

  switch (command) {
    case 'db': {
      const db = await import('./lib/tasks/db.js');
      if (subcommand === 'test') return run(db.testConnection);
      if (subcommand === 'recalculate-counts') return run(db.recalculatePostCounts);
      break;
    }

    case 'setup-token':
      return run((await import('./lib/tasks/setup.js')).generateSetupToken, [subcommand, ...rest].filter(Boolean));

    case 'bootstrap': {
      const bootstrap = await import('./lib/tasks/bootstrap.js');
      if (subcommand === 'fresh-install') return run(bootstrap.resetFreshInstall, args);
      break;
    }

    case 'analytics': {
      const analytics = await import('./lib/tasks/analytics.js');
      if (subcommand === 'day') {
        assertLocalDevelopment('analytics day');
        return run(analytics.simulateDay, args);
      }
      if (subcommand === 'run') {
        assertLocalDevelopment('analytics run');
        return run(analytics.runSimulation);
      }
      if (subcommand === 'aggregate') {
        assertLocalDevelopment('analytics aggregate');
        return run(analytics.aggregateDailyViews);
      }
      if (subcommand === 'scheduler') {
        assertLocalDevelopment('analytics scheduler');
        return run(analytics.runScheduler);
      }
      break;
    }

    case 'media': {
      const media = await import('./lib/tasks/media.js');
      if (subcommand === 'thumbnails') return run(media.generateThumbnails, args);
      if (subcommand === 'clear') return run(media.clearImages);
      if (subcommand === 'cleanup') return run(media.cleanupDuplicates);
      break;
    }

    case 'maintenance': {
      const maintenance = await import('./lib/tasks/maintenance.js');
      if (subcommand === 'reset-password') return run(maintenance.resetAdminPassword, args);
      if (subcommand === 'update-views') {
        assertLocalDevelopment('maintenance update-views');
        return run(maintenance.updatePostViews);
      }
      if (subcommand === 'update-colors') return run(maintenance.updateCategoryColors);
      break;
    }

    default:
      break;
  }

  console.error(`Unknown command: ${command}${subcommand ? ` ${subcommand}` : ''}\n`);
  console.log(HELP);
  process.exit(1);
}

main();
