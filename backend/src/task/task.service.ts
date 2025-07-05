import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async createTask(userId: number, dto: CreateTaskDto) {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });

    return task;
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
    });
  }

  async updateTask(taskId: number, dto: UpdateTaskDto) {
     const task = this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: { ...dto },
    });

    return task
  }
}
