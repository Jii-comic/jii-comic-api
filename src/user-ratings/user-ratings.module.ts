import { Module } from "@nestjs/common";
import { UserRatingsService } from "./user-ratings.service";
import { UserRatingsController } from "./user-ratings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRating } from "./entities/user-rating.entity";
import { ComicsService } from "src/comics/comics.service";
import { Comic } from "src/comics/entities/comic.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserRating, Comic])],
    controllers: [UserRatingsController],
    providers: [UserRatingsService, ComicsService],
})
export class UserRatingsModule {}
