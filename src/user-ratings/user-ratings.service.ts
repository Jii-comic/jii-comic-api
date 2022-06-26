import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comic } from "src/comics/entities/comic.entity";
import { User } from "src/users/entities/user.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateUserRatingDto } from "./dto/create-user-rating.dto";
import { RatingDto } from "./dto/rating.dto";
import { UpdateUserRatingDto } from "./dto/update-user-rating.dto";
import { UserRating } from "./entities/user-rating.entity";

@Injectable()
export class UserRatingsService {
    constructor(
        @InjectRepository(UserRating)
        private readonly _userRatingRepository: Repository<UserRating>,
    ) {}

    getQueryBuilder(alias?: string) {
        return this._userRatingRepository.createQueryBuilder(alias);
    }

    findAllFromComic(comic: Comic) {
        return this._userRatingRepository.find({
            where: { comic: { comic_id: comic.comic_id } },
            relations: ["user"],
        });
    }

    getAverageRatingFromComic(comic: Comic) {
        return this.getQueryBuilder("userRating")
            .innerJoinAndSelect("userRating.comic", "comic")
            .where("comic.comic_id=:comicId", {
                comicId: comic.comic_id,
            })
            .select("AVG(userRating.rating_score)", "avg_rating_score")
            .getRawOne();
    }

    findOne(query: any) {
        return this._userRatingRepository.findOne(query, {
            relations: ["user"],
        });
    }

    async rate(ratingDto: RatingDto, user?: User, comic?: Comic) {
        return this._userRatingRepository.save({
            ...ratingDto,
            user,
            comic,
        });
    }

    async remove(id: string) {
        await this._userRatingRepository.delete(id);
        return true;
    }
}
