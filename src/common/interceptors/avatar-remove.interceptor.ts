import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Request } from 'express';
import { ImageService } from '../upload/image.service';

@Injectable()
export class AvatarRemoveInterceptor implements NestInterceptor {
  constructor(private readonly imageService: ImageService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((err: Error): Observable<never> => {
        const request = context.switchToHttp().getRequest<Request>();
        const file = request.file;

        if (file?.filename) {
          return from(
            this.imageService.removeImage('avatars', file.filename),
          ).pipe(
            switchMap(() => throwError(() => err)),
            catchError(() => throwError(() => err)),
          );
        }

        return throwError(() => err);
      }),
    );
  }
}
