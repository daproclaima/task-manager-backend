import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  /*
  in dev env: Log, Error, Warning, Debug, Verbose,
  in staging env: Log, Error, Warning,
  in production env: Log, Error
  in production env: Log, Error
  */
  const logger = new Logger('bootsrap');
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
