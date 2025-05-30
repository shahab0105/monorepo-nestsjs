import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { ContextType } from '@nestjs/common/interfaces';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GraphQLExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // const contextType = host.getType() as ContextType;

    // Only apply if context is GraphQL
    if (host.getType<string>() !== 'graphql') {
      throw exception;
    }

    const gqlHost = GqlArgumentsHost.create(host);

    this.logger.error('GraphQL Exception:', exception);

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message = (response as any)?.message || exception.message;
      return new ApolloError(message, exception.getStatus().toString());
    }

    if (exception instanceof Error) {
      return new ApolloError(exception.message);
    }

    return new ApolloError('Unknown error occurred');
  }
}
