import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Match } from "../decorators/match.decorator";

export class RegisterDto {
    @ApiProperty()
    @IsEmail({}, { message: i18nValidationMessage("auth.INVALID_EMAIL") })
    @IsNotEmpty({ message: i18nValidationMessage("auth.NEED_EMAIL") })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage("auth.NEED_PASSWORD") })
    password: string;

    @ApiProperty()
    @Match("password", {
        message: i18nValidationMessage("auth.PASSWORDS_NOT_EQUAL"),
    })
    @IsNotEmpty({
        message: i18nValidationMessage("auth.NEED_PASSWORD_CONFIRMATION"),
    })
    repeatPassword: string;

    @ApiProperty()
    name: string;
}
