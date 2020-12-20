import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  // declaring the typehint is not mandatory in ts but bring better design
  getAllTasks(): Task[] {
    return this.tasks;
  }
}
