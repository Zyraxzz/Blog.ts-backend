import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const AuthSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export class LoginDTO extends createZodDto(AuthSchema) {}
