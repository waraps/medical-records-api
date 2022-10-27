import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class EditPatientDto {

    @IsString()
    @IsOptional()
    owner_first_name?: string

    @IsString()
    @IsOptional()
    owner_last_name?: string

    @IsString()
    @IsOptional()
    owner_phone?: string
    
    @IsString()
    @IsOptional()
    owner_dni?: string    
    
    @IsEmail()
    @IsOptional()
    owner_email?: string
    
    @IsString()
    @IsOptional()
    pet_specie?: string
    
    @IsString()
    @IsOptional()
    pet_race?: string
    
    @IsString()
    @IsOptional()
    pet_name?: string
    
    @IsString()
    @IsOptional()
    pet_birth?: string

    @IsString()
    @IsOptional()
    pet_color?: string

    @IsInt()
    @IsOptional()
    pet_sex_id?: number

    @IsBoolean()
    @IsOptional()
    neutered?: boolean

    @IsUrl()
    @IsOptional()
    pet_avatar: string;
}