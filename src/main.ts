import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
async function bootstrap() {
  /*
  in dev env: Log, Error, Warning, Debug, Verbose,
  in staging env: Log, Error, Warning,
  in production env: Log, Error
  in production env: Log, Error
  */
  const logger = new Logger('bootsrap');
  const app = await NestFactory.create(AppModule);

  // select the config folder based on NODE_ENV
  const serverConfig = config.get('server');

  console.log(serverConfig);

  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
