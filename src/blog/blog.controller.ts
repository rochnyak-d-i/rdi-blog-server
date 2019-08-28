import {
  Controller,
  Get, Post, Put,
  Param, Body,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  NotFoundException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post/post.service';
import { Post as BlogPost } from './post/post.entity';
import { CreatePostDto } from './dto';

@Controller('blog')
export class BlogController {
  constructor(
    private readonly postService: PostService
  ) {}

  @Get('/')
  list(): Promise<BlogPost[]> {
    return this.postService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('post')
  @HttpCode(204)
  async storePost(@Body() createPostDto: CreatePostDto) {
    const post = Object.assign(new BlogPost(), createPostDto);

    await this.postService.save(post);
  }

  @Get('post/:id')
  blogPost(
    @Param('id', new ParseIntPipe()) id: number
  ): Promise<BlogPost> {
    const post = this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('post/:id')
  @HttpCode(204)
  async Post(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createPostDto: CreatePostDto
  ) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    Object.assign(post, createPostDto);

    await this.postService.save(post);
  }
}
