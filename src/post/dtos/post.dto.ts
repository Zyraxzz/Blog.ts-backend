import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const PostSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(100, { message: 'Title must be at most 100 characters long' }),
  description: z
    .string()
    .min(3, { message: 'Description must be at least 3 characters long' })
    .max(255, { message: 'Description must be at most 255 characters long' })
    .nullable()
    .optional(),
  content: z
    .string()
    .min(5, { message: 'Content must be at least 3 characters long' })
    .max(1000, { message: 'Content must be at most 255 characters long' }),
  image: z.url('Invalid image').nullable().optional(),
  highlight: z.boolean().default(false),
  published: z.boolean().default(false),
  categories: z.array(z.string()).optional().default([]),
});

export class PostDTO extends createZodDto(PostSchema) {}
