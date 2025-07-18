import { IsEmail, IsOptional, IsString } from "class-validator";

export class EditUserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    username?: string

    @IsString()
    @IsOptional()
    firstname?: string

    @IsString()
    @IsOptional()
    lastname?: string

    @IsString()
    refreshToken?: string
}