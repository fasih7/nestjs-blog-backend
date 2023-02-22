import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './post/post.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), PostModule],
})
export class AppModule {}
