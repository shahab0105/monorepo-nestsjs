import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/api/src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
      },
      playground: true,
    }),
    // ... other modules
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'theysaid',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PostsModule
  ],
  providers:[
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB']
})
export class AppModule {}
