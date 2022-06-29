import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDTO;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task: Task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): Task[] {
    const task = this.tasks.find((task: Task) => task.id === id);
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find((task: Task) => task.id === id);
    task.status = status;
    return task;
  }
}
