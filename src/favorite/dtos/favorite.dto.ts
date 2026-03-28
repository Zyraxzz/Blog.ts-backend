import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FavoriteSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be more than 3 characters long' }),
});

export class FavoriteDTO extends createZodDto(FavoriteSchema) {}
