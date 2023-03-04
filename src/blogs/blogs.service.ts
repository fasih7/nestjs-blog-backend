import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogModel.create(createBlogDto);
    return { _id: blog._id, success: true };
  }

  async findAll() {
    const blogs = await this.blogModel.find();
    if (blogs.length == 0) throw new NotFoundException('No blogs found');
    return blogs;
  }

  async findOneById(queryParams: Record<string, any>) {
    return await this.blogModel.findOne(queryParams);
  }

  async findByAuthorId(authorId: string) {
    const blogs = await this.blogModel.find({ authorId });
    if (blogs.length == 0)
      return new NotFoundException('No blogs found').getResponse();
    return blogs;
  }

  async update(_id: string, updateBlogDto: UpdateBlogDto, authorId: string) {
    const result = await this.blogModel.findOneAndUpdate(
      { _id, authorId },
      updateBlogDto,
    );

    if (!result) throw new NotFoundException('No blog found').getResponse();
    return { _id: result._id, success: true };
  }

  async remove(_id: string, authorId: string) {
    const result = await this.blogModel.remove({ _id, authorId });
    if (result.deleteCount === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
