import { IsEmail, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class EditUserDto {
    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsOptional()
    dni?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsUrl()
    @IsOptional()
    avatar: string;

    @IsInt()
    @IsOptional()
    role_id?: number;
}