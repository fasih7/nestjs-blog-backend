import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.userModel.create(createUserDto);
      const { _id, email, fullName } = createdUser;
      return { _id, email, fullName, success: true };
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).lean();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
