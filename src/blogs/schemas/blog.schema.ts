import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  authorId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  body: string;

  @Prop()
  tags: string[];

  @Prop()
  picUrl: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
