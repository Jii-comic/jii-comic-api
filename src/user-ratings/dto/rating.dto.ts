import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class RatingDto {
    rating_id?: string;

    @ApiProperty()
    @Min(0)
    @Max(5)
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    rating_score: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}
