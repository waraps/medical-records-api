import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class EditOwnerDto {

    @IsString()
    @IsOptional()
    first_name: string

    @IsString()
    @IsOptional()
    last_name: string

    @IsString()
    @IsOptional()
    phone: string
    
    @IsString()
    @IsOptional()
    dni: string  
    
    @IsString()
    @IsOptional()
    address: string  
    
    @IsEmail()
    @IsOptional()
    email: string  

    @IsString()
    @IsOptional()
    occupation: string 

    @IsString()
    @IsOptional()
    housing: string

    @IsBoolean()
    @IsOptional()
    other_pets: boolean

    @IsString()
    @IsOptional()
    avatar: string
}