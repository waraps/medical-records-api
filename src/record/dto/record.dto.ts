import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RecordDto {
    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsString()
    @IsNotEmpty()
    revelevant_clinic: string;

    @IsString()
    @IsNotEmpty()
    diagnosis: string;

    @IsString()
    @IsNotEmpty()
    treatment: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    weight: number;

    @IsInt()
    @IsNotEmpty()
    patient_id: number
}