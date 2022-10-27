import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsUrl()
    @IsOptional()
    avatar: string;

    @IsInt()
    // @IsNotEmpty()
    @IsOptional()
    rol_id: number;
}