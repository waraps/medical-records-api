import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditRecordDto {
    @IsString()
    @IsOptional()
    reason: string;

    @IsString()
    @IsOptional()
    revelevant_clinic: string;

    @IsString()
    @IsOptional()
    diagnosis: string;

    @IsString()
    @IsOptional()
    treatment: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    weight: number;
}