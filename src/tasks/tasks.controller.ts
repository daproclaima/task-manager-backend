import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  //  to inject a service, it is by the constructor
  // by default when I add private it creates the field as private
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // console.log(filterDto);
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto);
    }
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
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

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
