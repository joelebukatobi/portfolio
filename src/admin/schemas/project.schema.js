import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(150),
  description: z.string().trim().min(1, 'Description is required').max(2000),
  technologies: z.string().trim().min(1, 'Technologies are required').max(500),
  website: z.string().trim().url('Must be a valid URL').max(500).optional().or(z.literal('')),
});

export const updateProjectSchema = createProjectSchema;
