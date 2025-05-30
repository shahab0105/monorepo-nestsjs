import {
  Resolver,
  Query,
  Mutation,
  Subscription,
  Args,
  Int,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    @Inject('PUB_SUB') private pubSub: PubSub
  ) {}

  @Query(() => [Post])
  posts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Query(() => String)
  triggerError(): string {
    throw new Error('This is a simulated error for demonstration.');
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string
  ) {
    const post = await this.postsService.create({ title, content });
    this.pubSub.publish('postCreated', { postCreated: post });
    return post;
  }

  @Subscription(() => Post)
  postCreated() {
    return this.pubSub.asyncIterator('postCreated');
  }

  @Mutation(() => Boolean)
  async deletePost(@Args('id', { type: () => Int }) id: number) {
    await this.postsService.remove(id);
    return true;
  }

  @Mutation(() => Boolean)
  async updatePost(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('content') content: string
  ) {
    await this.postsService.update(id, { title, content });
    return true;
  }
}
