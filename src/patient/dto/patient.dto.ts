import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class PatientDto {
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
    @IsNotEmpty()
    owner_id: number

    @IsUrl()
    @IsOptional()
    avatar: string;
}