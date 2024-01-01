import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TimerDto } from "./dto";

@Injectable()
export class TimerService {
    constructor(private prisma: PrismaService) {}
    async timer(userId: number, dto: TimerDto) {
        const timer = await this.prisma.pomodoro.create({
          data: {
            userId,
            ...dto,
          },
        });
    
        return timer;
      }
}