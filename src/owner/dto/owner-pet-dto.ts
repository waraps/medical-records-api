import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OwnerPetDto {

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
    @IsNotEmpty()
    specie: string
    
    @IsString()
    @IsNotEmpty()
    race: string
    
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    birth: string

    @IsString()
    @IsNotEmpty()
    color: string

    @IsInt()
    @IsNotEmpty()
    sex_id: number

    @IsBoolean()
    @IsNotEmpty()
    neutered: boolean

    @IsInt()
    @IsOptional()
    owner_id: number
}