import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    const parentType = info.parentType?.name ?? 'UNKNOWN';
    const fieldName = info.fieldName ?? 'unknown';

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        this.logger.log(
          `${parentType} "${fieldName}" completed in ${duration}ms`
        );
      })
    );
  }
}
