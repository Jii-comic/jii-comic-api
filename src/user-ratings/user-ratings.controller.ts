import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
    BadRequestException,
} from "@nestjs/common";
import { UserRatingsService } from "./user-ratings.service";
import { ComicsGuard } from "src/guards";
import { RatingDto } from "./dto/rating.dto";
import { JwtAuthGuard } from "src/auth";

@Controller("/comics/:comicId/ratings")
@UseGuards(ComicsGuard)
export class UserRatingsController {
    constructor(private readonly _userRatingsService: UserRatingsService) {}

    @Get()
    async findAll(@Request() req) {
        const { comic } = req;
        try {
            const ratings = await this._userRatingsService.findAllFromComic(
                comic,
            );
            const avgRatingScore =
                await this._userRatingsService.getAverageRatingFromComic(comic);

            return {
                ratings,
                ...avgRatingScore,
            };
        } catch (err) {
            console.error(err);
            throw new BadRequestException();
        }
    }

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return this._userRatingsService.findOne(+id);
    // }

    @Post()
    @UseGuards(JwtAuthGuard)
    async rate(@Request() req, @Body() ratingDto: RatingDto) {
        const { comic, user } = req;
        const rating = await this._userRatingsService.findOne({ user });
        if (rating) {
            throw new BadRequestException();
        }

        try {
            return this._userRatingsService.rate(
                {
                    ...ratingDto,
                },
                user,
                comic,
            );
        } catch (err) {
            console.error(err);
            throw new BadRequestException();
        }
    }

    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    update(@Param("id") id: string, @Body() ratingDto: RatingDto) {
        return this._userRatingsService.rate({
            rating_id: id,
            ...ratingDto,
        });
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    async remove(@Param("id") id: string) {
        const rating = await this._userRatingsService.findOne(id);
        if (!rating) {
            throw new BadRequestException();
        }

        try {
            return await this._userRatingsService.remove(id);
        } catch (err) {
            console.error(err);
            throw new BadRequestException();
        }
    }
}
