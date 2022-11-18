import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class MedicalAppointmentDto {
    @IsString()
    @IsNotEmpty()
    status: string;

    @IsInt()
    @IsNotEmpty()
    patient_id: number;

    @IsInt()
    @IsOptional()
    user_id: number;
}