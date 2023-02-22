import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './schemas/post.schema';

//TODO: Add global exception handling
//TODO: Add exception handling here

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto) {
    const post = await this.postModel.create(createPostDto);
    return { _id: post._id, success: true };
  }

  async findAll() {
    return await this.postModel.find();
  }

  async findOne(_id: string) {
    return await this.postModel.findOne({ _id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
