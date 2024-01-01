import { IsDate, IsNotEmpty } from "class-validator";

export class TimerDto {
        @IsDate()
        @IsNotEmpty()
        startTime: Date

        @IsDate()
        @IsNotEmpty()
        endTime: Date
}