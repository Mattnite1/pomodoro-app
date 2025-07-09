import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard";
import { TimerService } from "./timer.service";
import { GetUser } from "src/auth/decorator";
import { TimerDto } from "./dto";

@UseGuards(JwtGuard)
@Controller("timers")
export class TimerController {
    constructor(private timerService: TimerService) {}

    @Post()
    timer(@GetUser('id') userId: number, @Body() dto: TimerDto) {
     return this.timerService.timer(userId, dto)
    }
}