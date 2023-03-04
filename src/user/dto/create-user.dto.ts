import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateUserDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
