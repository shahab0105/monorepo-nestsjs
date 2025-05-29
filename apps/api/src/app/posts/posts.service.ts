import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepo.find();
  }

  findOne(id: number): Promise<Post | null> {
    return this.postRepo.findOneBy({ id });
  }

  create(data: Partial<Post>): Promise<Post> {
    const post = this.postRepo.create(data);
    return this.postRepo.save(post);
  }

  update(id: number, data: Partial<Post>) {
    return this.postRepo.update(id, data);
  }

  remove(id: number) {
    return this.postRepo.delete(id);
  }
}
