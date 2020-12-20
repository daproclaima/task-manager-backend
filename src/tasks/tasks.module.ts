import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

// services are providers in nestjs
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
