import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
// import { Logger } from '@nestjs/common';

const dbConfig = config.get('db');
// const logger = new Logger('typeOrmConfig');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DATABASE || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
// logger.debug(`typeOrmConfig config is: ${JSON.stringify(typeOrmConfig)}`);
