import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Genre } from "src/genres/entities/genre.entity";

export class CreateComicDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage("comic.NEED_NAME") })
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    genres: Genre[];

    @ApiProperty()
    @IsUrl({}, { message: i18nValidationMessage("comic.INVALID_URL") })
    @IsOptional()
    thumbnailUrl: string;

    @ApiProperty()
    @IsUrl({}, { message: i18nValidationMessage("comic.INVALID_URL") })
    @IsOptional()
    coverUrl: string;
}
