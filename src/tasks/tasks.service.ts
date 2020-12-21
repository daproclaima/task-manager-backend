import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  // // declaring the typehint is not mandatory in ts but bring better design
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  //
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);
  //
  //   if (!found) {
  //     //  Nest provides the error handler,
  //     //  we return an error not handled by controller,
  //     //  but to nest behind the scene (as an http error excep)
  //     /*
  //       {
  //         "statusCode": 404,
  //         "message": "Task with id not found"
  //       }
  //     */
  //     throw new NotFoundException(`Task with ${id} not found`);
  //   }
  //   return found;
  // }
  //
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  //
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task);
  //   // return the task. Frontend devs need it,
  //   // that way they don t need an extra fetch or refresh the application
  //   return task;
  // }
  //
  // deleteTask(id: string): void {
  //   // todo: read the tasks array twice. refactor
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
  //
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
