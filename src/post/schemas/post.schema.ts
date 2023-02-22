import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  authorId: string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop()
  tags: string[];

  @Prop()
  picUrl: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
