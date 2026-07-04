import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { decryptSecret, encryptSecret, isEncryptedSecret } from '../../../src/lib/secret-crypto.js';

describe('secret-crypto', () => {
  const originalSecret = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret-for-encryption-32chars';
  });

  afterEach(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  it('encrypts and decrypts a value', () => {
    const encrypted = encryptSecret('mailbox-password');
    expect(isEncryptedSecret(encrypted)).toBe(true);
    expect(decryptSecret(encrypted)).toBe('mailbox-password');
  });

  it('encrypts using the shared app secret fallback when JWT_SECRET is unset', () => {
    delete process.env.JWT_SECRET;
    delete process.env.APP_ENCRYPTION_KEY;

    const encrypted = encryptSecret('mailbox-password');
    expect(isEncryptedSecret(encrypted)).toBe(true);
    expect(decryptSecret(encrypted)).toBe('mailbox-password');
  });
});
