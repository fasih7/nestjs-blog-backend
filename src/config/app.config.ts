import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    env: process.env.APP_ENV || 'development',
    http: {
      //TODO: change 8081 to 3000 as dev server is using port 3000
      port: parseInt(process.env.PORT) || 3030,
    },
    mongoUri:
      process.env.MONGODB_CONNECTION_STRING ||
      'mongodb+srv://Blogger:nGSHqY1znr4EuKnA@blogger.jvaggcb.mongodb.net/?retryWrites=true&w=majority',
  }),
);
