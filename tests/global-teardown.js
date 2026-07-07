export default async function globalTeardown() {
  try {
    const { closePool } = await import('../src/db/index.js');
    await closePool();
  } catch {
    // Pool was never opened (unit-only runs).
  }
}
