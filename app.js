import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

const BOOT_STATE_FILE = path.join(__dirname, 'tmp', 'boot-state.json');
const MAX_FAILURES = 5;
const FAILURE_WINDOW_MS = 5 * 60 * 1000;
const THROTTLE_MS = 90 * 1000;

function readBootState() {
  try {
    return JSON.parse(fs.readFileSync(BOOT_STATE_FILE, 'utf8'));
  } catch {
    return { failures: [] };
  }
}

function writeBootState(state) {
  fs.mkdirSync(path.dirname(BOOT_STATE_FILE), { recursive: true });
  fs.writeFileSync(BOOT_STATE_FILE, JSON.stringify(state));
}

function clearBootState() {
  try {
    fs.unlinkSync(BOOT_STATE_FILE);
  } catch {
    // ignore
  }
}

async function recordBootFailure(reason) {
  const now = Date.now();
  const state = readBootState();
  const failures = [...(state.failures || []).filter((t) => now - t < FAILURE_WINDOW_MS), now];
  writeBootState({ failures });

  if (failures.length >= MAX_FAILURES) {
    console.error(
      `Boot failed ${failures.length} times in ${FAILURE_WINDOW_MS / 60000} minutes (${reason}). ` +
      `Waiting ${THROTTLE_MS / 1000}s before exit to reduce restart pressure on shared hosting.`,
    );
    console.error('Pause the Node app in cPanel if this continues. Run NPM Install if dependencies are missing.');
    await new Promise((resolve) => setTimeout(resolve, THROTTLE_MS));
  }
}

function verifyDependencies() {
  try {
    require.resolve('fastify');
  } catch {
    return false;
  }
  return true;
}

async function start() {
  if (!verifyDependencies()) {
    await recordBootFailure('missing_dependencies');
    console.error('BOOT FAILED: node_modules missing or incomplete. Run "NPM Install" in cPanel Node.js App.');
    process.exit(1);
  }

  await import('./src/server.js');
  clearBootState();
}

start().catch(async (error) => {
  console.error('Failed to start application:', error);
  await recordBootFailure(error?.code || 'boot_error');
  process.exit(1);
});
