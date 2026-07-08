import { describe, it, expect } from 'vitest';
import { createProjectSchema } from '../../../src/admin/schemas/project.schema.js';

describe('createProjectSchema', () => {
  it('accepts valid input', () => {
    const result = createProjectSchema.safeParse({
      name: 'xPathEdge',
      description: 'A modern web platform for remote teams.',
      technologies: 'laravel - alpinejs - bootstrap',
      website: 'https://example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = createProjectSchema.safeParse({
      name: '   ',
      description: 'Something',
      technologies: 'react',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty description', () => {
    const result = createProjectSchema.safeParse({
      name: 'Test',
      description: '',
      technologies: 'react',
    });
    expect(result.success).toBe(false);
  });

  it('allows website to be omitted', () => {
    const result = createProjectSchema.safeParse({
      name: 'Test',
      description: 'Something',
      technologies: 'react',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid website URL', () => {
    const result = createProjectSchema.safeParse({
      name: 'Test',
      description: 'Something',
      technologies: 'react',
      website: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('trims name', () => {
    const result = createProjectSchema.safeParse({
      name: '  Test  ',
      description: 'Something',
      technologies: 'react',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Test');
    }
  });
});
