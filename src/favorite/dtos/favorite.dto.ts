import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FavoriteSchema = z.object({
  post_id: z.cuid(),
});

export class FavoriteDTO extends createZodDto(FavoriteSchema) {}
