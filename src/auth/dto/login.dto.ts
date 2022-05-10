import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class LoginDto {
    @ApiProperty()
    @IsEmail({ message: i18nValidationMessage("auth.INVALID_EMAIL") })
    @IsNotEmpty({ message: i18nValidationMessage("auth.NEED_EMAIL") })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage("auth.NEED_PASSWORD") })
    password: string;
}
