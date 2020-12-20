import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    // console.log('title:', title);
    // console.log('description:', description);
    return this.taskService.createTask(createTaskDto);
  }
}
