import { IsNotEmpty, IsString } from "class-validator";

export class TestDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}