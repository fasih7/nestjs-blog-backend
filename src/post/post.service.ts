import { AssumeRoleCommand, STSClient } from '@aws-sdk/client-sts';
import { Injectable, NotFoundException, Post } from '@nestjs/common';
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

  async getParams() {
    // Set the AWS Region.
    const REGION = 'eu-central-1'; //e.g. "us-east-1"
    // Create an Amazon STS service client object.
    const stsClient = new STSClient({ region: REGION });

    // Set the parameters
    const params = {
      RoleArn: 'arn:aws:iam::724564194223:role/ctc-dev-server-rl', //ARN_OF_ROLE_TO_ASSUME
      RoleSessionName: 'local-session-w',
      DurationSeconds: 900,
    };

    const credentials = await stsClient.send(new AssumeRoleCommand(params));
  }

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

  async update(_id: string, updatePostDto: UpdatePostDto) {
    console.log(updatePostDto);
    const result = await this.postModel.findOneAndUpdate(
      { _id },
      updatePostDto,
    );
    return { _id: result._id, success: true };
  }

  async remove(_id: string) {
    const result = await this.postModel.remove({ _id });
    if (result.deleteCount === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
