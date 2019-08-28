import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post/post.service';
import { Post } from './post/post.entity';
import { BlogController } from './blog.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService],
  controllers: [BlogController],
})
export class BlogModule {}
