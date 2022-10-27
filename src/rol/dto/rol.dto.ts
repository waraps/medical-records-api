import { IsNotEmpty, IsString } from "class-validator";

export class RolDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}