import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const dotenv = require('dotenv');
  dotenv.config();
  const serverConfig = config.get('server');
  /*
  in dev env: Log, Error, Warning, Debug, Verbose,
  in staging env: Log, Error, Warning,
  in production env: Log, Error
  in production env: Log, Error
  */
  const logger = new Logger('bootsrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: process.env.ORIGIN });
  }

  // select the config folder based on NODE_ENV
  console.log(serverConfig);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
