import { IsEmail, IsNotEmpty } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Match("password")
    repeatPassword: string;
}
