/**
 * Shared app secret for JWT signing and settings encryption.
 * Must stay in sync across auth and secret-crypto.
 */
export const FALLBACK_APP_SECRET = 'dev-secret-change-in-production';

export function getAppSecret() {
  const secret = process.env.APP_ENCRYPTION_KEY || process.env.JWT_SECRET || FALLBACK_APP_SECRET;
  return String(secret).trim();
}
