import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsBoolean()
    @IsOptional()
    inProgress: boolean
}