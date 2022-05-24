import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";
import { Comic } from "./entities/comic.entity";

@Injectable()
export class ComicsService {
    constructor(
        @InjectRepository(Comic)
        private comicRepository: Repository<Comic>,
    ) {}

    getQueryBuilder() {
        return this.comicRepository.createQueryBuilder("comic");
    }

    async create(createComicDto: CreateComicDto) {
        const comic = this.comicRepository.create(createComicDto);
        return await this.comicRepository.save(comic);
    }

    async findAll(): Promise<Comic[]> {
        return await this.comicRepository.find({ relations: ["genres"] });
    }

    async findOne(id: string): Promise<Comic> {
        return await this.getQueryBuilder()
            .where("comic.comic_id=:id", { id })
            .leftJoinAndSelect("comic.chapters", "chapter")
            .leftJoinAndSelect("comic.users", "user")
            .leftJoinAndSelect("comic.genres", "genre")
            .loadRelationCountAndMap("comic.followerCount", "comic.users")
            .orderBy("chapter.created_at", "ASC")
            .getOne();
    }

    async findOneWithOptions(id: string, options): Promise<Comic> {
        return await this.comicRepository.findOne(id, options);
    }

    async update(id: string, updateComicDto: UpdateComicDto) {
        return await this.comicRepository.save({
            comic_id: id,
            ...updateComicDto,
        });
    }

    async remove(id: string) {
        return await this.comicRepository.delete(id);
    }

    async follow(id: string, user: User) {
        const comic: Comic = await this.comicRepository.findOne(id, {
            relations: ["users"],
        });

        const withoutUserFollow = comic.users.filter(
            (followedUser) => followedUser.user_id !== user.user_id,
        );
        const hasUnfollowed = comic.users.length - withoutUserFollow.length > 0;
        if (!hasUnfollowed) {
            comic.users.push(user);
        }

        this.comicRepository.save(comic);
        return { followerCount: comic.users.length, followed: !hasUnfollowed };
    }
}
