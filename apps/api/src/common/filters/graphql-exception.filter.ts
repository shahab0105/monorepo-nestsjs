import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    this.logger.error('GraphQL Exception:', exception);

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message = (response as any)?.message || exception.message;
      throw new ApolloError(message, exception.getStatus().toString());
    }

    if (exception instanceof Error) {
      throw new ApolloError(exception.message);
    }

    throw new ApolloError('Unknown error occurred');
  }
}
