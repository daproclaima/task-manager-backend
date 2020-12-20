import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  //  to inject a service, it is by the constructor
  // by default when I add private it creates the field as private
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  // first option: we extract everything
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // second option, we only extract what we want
  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    // console.log('title:', title);
    // console.log('description:', description);
    return this.taskService.createTask(title, description);
  }
}
