import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class PatientDto {

    @IsString()
    @IsNotEmpty()
    owner_first_name: string

    @IsString()
    @IsNotEmpty()
    owner_last_name: string

    @IsString()
    @IsNotEmpty()
    owner_phone: string
    
    @IsString()
    @IsNotEmpty()
    owner_dni: string    
    
    @IsEmail()
    @IsNotEmpty()
    owner_email: string  
    
    @IsString()
    @IsNotEmpty()
    pet_specie: string
    
    @IsString()
    @IsNotEmpty()
    pet_race: string
    
    @IsString()
    @IsNotEmpty()
    pet_name: string
    
    @IsString()
    @IsNotEmpty()
    pet_birth: string

    @IsString()
    @IsNotEmpty()
    pet_color: string

    @IsInt()
    @IsNotEmpty()
    pet_sex_id: number

    @IsBoolean()
    @IsNotEmpty()
    neutered: boolean

    @IsUrl()
    @IsOptional()
    pet_avatar: string;
}