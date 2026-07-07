import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { createIntegrationServer } from '../../helpers/integration-server.js';
import { authService } from '../../../src/services/auth.service.js';

describe('forgot password flow', () => {
  /** @type {import('fastify').FastifyInstance} */
  let server;

  beforeAll(async () => {
    server = await createIntegrationServer();
  });

  afterAll(async () => {
    await server.close();
  });

  it('creates a reset token and returns a success message', async () => {
    const sendSpy = vi.spyOn(
      (await import('../../../src/services/mail.service.js')).mailService,
      'sendPasswordResetEmail',
    ).mockResolvedValue(undefined);

    const response = await server.inject({
      method: 'POST',
      url: '/admin/auth/forgot-password',
      payload: { email: 'admin@example.com' },
      headers: {
        'content-type': 'application/json',
        'hx-request': 'true',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toContain('If an account exists with this email');
    expect(sendSpy).toHaveBeenCalledOnce();

    const tokenArg = sendSpy.mock.calls[0]?.[1]?.token;
    expect(tokenArg).toBeTruthy();

    const resetData = await authService.validatePasswordResetToken(tokenArg);
    expect(resetData?.user?.email).toBe('admin@example.com');

    sendSpy.mockRestore();
  });
});
