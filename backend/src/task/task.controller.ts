import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { GetUser, GetTask } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.taskService.findAll(userId);
  }

  @Post()
  createTask(@GetUser('id') userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @Patch(':id')
  async updateTask(@Param('id') taskId: number, @Body() dto: UpdateTaskDto) {
    return this.taskService.updateTask(taskId, dto);
  }
}
