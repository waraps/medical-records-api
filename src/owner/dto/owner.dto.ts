import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OwnerDto {

    @IsString()
    @IsNotEmpty()
    first_name: string

    @IsString()
    @IsNotEmpty()
    last_name: string

    @IsString()
    @IsNotEmpty()
    phone: string
    
    @IsString()
    @IsNotEmpty()
    dni: string  
    
    @IsString()
    @IsNotEmpty()
    address: string  
    
    @IsEmail()
    @IsNotEmpty()
    email: string  

    @IsString()
    @IsNotEmpty()
    occupation: string 
    
    @IsString()
    @IsNotEmpty()
    housing: string
    
    @IsBoolean()
    @IsNotEmpty()
    other_pets: boolean

    @IsString()
    @IsOptional()
    avatar: string
}