import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RecordDto {
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

    @IsInt()
    @IsNotEmpty()
    patient_id: number

    @IsInt()
    @IsNotEmpty()
    appointment_id: number
}
