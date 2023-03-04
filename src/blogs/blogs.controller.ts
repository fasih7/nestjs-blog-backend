import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogDto: CreateBlogDto, @Request() req: any) {
    createBlogDto.authorId = req.user._id;
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get('blog/:id')
  findOneById(@Param('id') id: string) {
    return this.blogsService.findOneById({ _id: id });
  }

  @Get('user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.blogsService.findByAuthorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateBlogDto: UpdateBlogDto,
    @Request() req: any,
  ) {
    return this.blogsService.update(id, UpdateBlogDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.blogsService.remove(id, req.user._id);
  }
}
