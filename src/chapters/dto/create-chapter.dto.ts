import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsJSON, IsNotEmpty, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class CreateChapterDto {
    @ApiProperty()
    @IsNotEmpty({ message: i18nValidationMessage("chapter.NEED_NAME") })
    name: string;

    @ApiProperty()
    @IsArray({ message: i18nValidationMessage("chapter.INVALID_CONTENT") })
    @IsOptional()
    pages: string[];
}
