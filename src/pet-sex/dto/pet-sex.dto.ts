import { IsNotEmpty, IsString } from "class-validator";

export class PetSexDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}