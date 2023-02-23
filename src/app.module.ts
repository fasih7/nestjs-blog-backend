import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Blogger:nGSHqY1znr4EuKnA@blogger.jvaggcb.mongodb.net/?retryWrites=true&w=majority',
    ),
    PostModule,
  ],
})
export class AppModule {}
