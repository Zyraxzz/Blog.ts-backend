import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const [firstIssue] = result.error.issues;

      throw new BadRequestException({
        statusCode: 400,
        message: firstIssue?.message ?? 'Validation failed',
        field: firstIssue?.path.join('.') ?? 'unknown',
      });
    }
    return result.data;
  }
}
