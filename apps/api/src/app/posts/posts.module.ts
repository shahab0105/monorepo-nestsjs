import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsService,
    PostsResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: [PostsService],
})
export class PostsModule {}
