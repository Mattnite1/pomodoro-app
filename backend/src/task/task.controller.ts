import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto';
import { GetUser } from 'src/auth/decorator';
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

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteTask(@Param('id') taskId: number) {
    return this.taskService.deleteTask(taskId);
  }
}
