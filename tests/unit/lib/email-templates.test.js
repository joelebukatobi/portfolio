import { describe, it, expect } from 'vitest';
import {
  renderInviteEmail,
  renderPasswordResetEmail,
  renderTestEmail,
} from '../../../src/lib/email-templates.js';

const settingsMap = {
  siteName: 'Joel Onwuanaku',
  siteUrl: 'https://example.com',
  siteIcon: '/favicon.svg',
};

describe('email templates', () => {
  it('renders invite email with branding and CTA', () => {
    const html = renderInviteEmail(settingsMap, {
      firstName: 'Lucas',
      invitedByName: 'Joel Admin',
      actionUrl: 'https://example.com/admin/auth/accept-invite?token=abc',
    });

    expect(html).toContain('Joel Onwuanaku');
    expect(html).toContain('joelebukatobi');
    expect(html).toContain('Fira+Code');
    expect(html).toContain('color:#d45524');
    expect(html).toContain('font-size:2.1rem');
    expect(html).toContain('Hi Lucas');
    expect(html).toContain('Joel Admin');
    expect(html).toContain('Accept Invitation');
    expect(html).toContain('accept-invite?token=abc');
  });

  it('renders password reset email with expiry footer', () => {
    const html = renderPasswordResetEmail(settingsMap, {
      firstName: 'Lucas',
      actionUrl: 'https://example.com/admin/auth/reset-password?token=xyz',
    });

    expect(html).toContain('Reset Password');
    expect(html).toContain('Reset Your Password');
    expect(html).toContain('expires in 1 hour');
    expect(html).toContain('reset-password?token=xyz');
  });

  it('renders SMTP test email with dashboard link', () => {
    const html = renderTestEmail(settingsMap, {
      actionUrl: 'https://example.com/admin',
    });

    expect(html).toContain('Smtp Test Successful');
    expect(html).toContain('Open Dashboard');
    expect(html).toContain('background:#d45524');
    expect(html).toContain('https://example.com/admin');
  });

  it('renders portfolio text logo with bracket markup', () => {
    const html = renderTestEmail(settingsMap, {
      actionUrl: 'https://example.com/admin',
    });

    expect(html).toContain('&lt;');
    expect(html).toContain('&#47;&gt;');
    expect(html).toContain('href="https://example.com"');
  });

  it('escapes HTML in user-provided names', () => {
    const html = renderInviteEmail(settingsMap, {
      firstName: '<script>',
      invitedByName: 'Evil & Co',
      actionUrl: 'https://example.com/invite',
    });

    expect(html).not.toContain('<script>');
    expect(html).toContain('Evil &amp; Co');
  });
});
