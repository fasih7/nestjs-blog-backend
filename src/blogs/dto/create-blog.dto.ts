import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class CreateBlogDto {
  //TODO: Add validation
  authorId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  picUrl: string;
}
