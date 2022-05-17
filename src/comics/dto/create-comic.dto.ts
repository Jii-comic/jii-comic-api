import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateComicDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage("comic.NEED_NAME") })
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsUrl({}, { message: i18nValidationMessage("comic.INVALID_URL") })
    @IsOptional()
    thumbnail: string;

    @ApiProperty()
    @IsUrl({}, { message: i18nValidationMessage("comic.INVALID_URL") })
    @IsOptional()
    coverUrl: string;
}
