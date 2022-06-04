import { ApiQuery } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class FindAllOptionsDto {
    @IsOptional()
    query?: string;

    @IsIn(["created_at", "updated_at"])
    @IsOptional()
    orderBy?: "created_at" | "updated_at";

    @IsIn(["ASC", "DESC"])
    @IsOptional()
    order?: "ASC" | "DESC";

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    limit?: number;
}
