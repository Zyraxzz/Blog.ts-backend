import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';
import { ZodValidationException } from 'nestjs-zod';

@Catch(ZodError, ZodValidationException)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const zodError: ZodError =
      exception instanceof ZodValidationException
        ? exception.getZodError()
        : exception;

    const [firstIssue] = zodError.issues;

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: firstIssue?.message ?? 'Validation failed',
      field: firstIssue?.path.join('.') ?? 'unknown',
    });
  }
}
