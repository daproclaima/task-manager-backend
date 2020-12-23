import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import {NotFoundException} from "@nestjs/common";
import {CreateTaskDto} from "./dto/create-task.dto";
import {User} from "../auth/user.entity";
import {IsNotEmpty} from "class-validator";
import {Task} from "./task.entity";

const mockUser = { id: 12, username: 'Test user' };
// factory function syntax so self called
const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
});

describe('TaskService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repository', async () => {
      // taskRepository.getTasks.mockReturnedValue();
      // taskRepository.getTasks.mockRejectedValue();
      taskRepository.getTasks.mockResolvedValue('someValue');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };
      const result = await tasksService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTasksById', () => {
    it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('Throws an error if task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById(0, mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    // async createTask(createTaskDto: CreateTaskDto, user: User) {
    // return this.taskRepository.createTask(createTaskDto, user);
    // }
    it('calls repository.createTask and returns the result', async () => {
      //  3
      taskRepository.createTask.mockResolvedValue('someTask');
      // 1
      expect(taskRepository.createTask).not.toHaveBeenCalled();
      const createTaskDto = { title: 'Test task', description: 'Test desc' };
      // We don t care about how the repository handles this request
      //  We just need to check that services does call repository.createTask
      // taskRepository.createTask.mockResolvedValue(createTaskMock, mockUser);
      // 2
      const result = await tasksService.createTask(createTaskDto, mockUser);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
      // 3
      expect(result).toEqual('someTask');
    });
  });
});
