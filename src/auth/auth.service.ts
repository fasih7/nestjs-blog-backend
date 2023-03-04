import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

    return this.userService.create({ ...signUpDto, password: hashedPassword });
  }

  async verifyUser({ email, password: plainPassword }) {
    try {
      const userDetails = await this.userService.findOneByEmail(email);

      if (!userDetails) throw new Error(`Invalid credentials`);

      const passwordMatched = await bcrypt.compare(
        plainPassword,
        userDetails.password,
      );
      if (!passwordMatched) throw new Error(`Invalid credentials`);

      const { password, ...restDetails } = userDetails;
      return restDetails;
    } catch (error) {
      console.error(error);
      if (error.message === 'Invalid credentials')
        throw new BadRequestException('Wrong Email or Password');
      throw new InternalServerErrorException(error);
    }
  }

  async login(userDetails: Record<string, any>) {
    return {
      access_token: this.jwtService.sign(userDetails),
    };
  }
}
