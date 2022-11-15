import { IsBoolean, IsEmail, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class EditPatientDto {

    @IsString()
    @IsOptional()
    first_name?: string

    @IsString()
    @IsOptional()
    last_name?: string

    @IsString()
    @IsOptional()
    phone?: string
    
    @IsString()
    @IsOptional()
    dni?: string    
    
    @IsEmail()
    @IsOptional()
    email?: string
    
    @IsString()
    @IsOptional()
    specie?: string
    
    @IsString()
    @IsOptional()
    race?: string
    
    @IsString()
    @IsOptional()
    name?: string
    
    @IsString()
    @IsOptional()
    birth?: string

    @IsString()
    @IsOptional()
    color?: string

    @IsInt()
    @IsOptional()
    sex_id?: number

    @IsBoolean()
    @IsOptional()
    neutered?: boolean

    @IsInt()
    @IsOptional()
    owner_id?: number

    @IsUrl()
    @IsOptional()
    avatar: string;
}