import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be more than 3 characters long' }),
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Password must have at least 8 characters'),
});

export class UserDTO extends createZodDto(UserSchema) {}
