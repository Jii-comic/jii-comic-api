import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsUUID } from "class-validator";

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

    @IsBoolean()
    @IsOptional()
    followedByUser?: boolean;
}
