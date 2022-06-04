import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { FindManyOptions, Like, Repository } from "typeorm";
import { CreateComicDto } from "./dto/create-comic.dto";
import { FindAllOptionsDto } from "./dto/find-all-option.dto";
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

    async findAll(options?: FindAllOptionsDto): Promise<Comic[]> {
        return await this.getQueryBuilder()
            .take(options.limit || 0)
            .where("comic.name ilike :name", {
                name: `%${options.query || ""}%`,
            })
            .leftJoin("comic.chapters", "chapter")
            // Select fields after join
            .addSelect([
                "chapter.chapter_id",
                "chapter.name",
                "chapter.created_at",
                "chapter.updated_at",
            ])
            .leftJoinAndSelect("comic.genres", "genre")
            .orderBy(`comic.${options.orderBy}`, options.order)
            .getMany();
    }

    async findOne(id: string): Promise<Comic> {
        return await this.getQueryBuilder()
            .where("comic.comic_id=:id", { id })
            .leftJoin("comic.chapters", "chapter")
            // Select fields after join
            .addSelect([
                "chapter.chapter_id",
                "chapter.name",
                "chapter.created_at",
                "chapter.updated_at",
            ])
            .leftJoinAndSelect("comic.genres", "genre")
            .orderBy("chapter.created_at", "DESC")
            .getOne();
    }

    async checkFollow(id: string, user: User): Promise<boolean> {
        const { users } = await this.comicRepository.findOne({
            join: {
                alias: "comics",
                leftJoinAndSelect: { users: "comics.users" },
            },
            where: (qb) => {
                qb.where({
                    // Filter Role fields
                    comic_id: id,
                }).andWhere("users.user_id = :userId", {
                    userId: user.user_id,
                });
            },
        });

        return !!users;
    }

    async findOneWithOptions(id: string, options): Promise<Comic> {
        return await this.comicRepository.findOne(id, options);
    }

    async update(id: string, updateComicDto: UpdateComicDto) {
        // ? Use update() to update timestamp
        return await this.comicRepository.update(
            {
                comic_id: id,
            },
            updateComicDto,
        );
    }

    async remove(id: string) {
        return await this.comicRepository.delete(id);
    }

    async follow(id: string, user: User) {
        const comic = await this.comicRepository.findOne({
            join: {
                alias: "comics",
                leftJoinAndSelect: { users: "comics.users" },
            },
            where: (qb) => {
                qb.where({
                    // Filter Role fields
                    comic_id: id,
                });
            },
        });

        const withoutUserFollow =
            comic?.users?.filter?.(
                (followedUser) => followedUser.user_id !== user.user_id,
            ) || [];
        const hasUnfollowed =
            (comic?.users?.length ?? 0) - withoutUserFollow.length > 0;
        if (!hasUnfollowed) {
            comic?.users.push(user);
        } else {
            comic.users = withoutUserFollow;
        }

        this.comicRepository.save(comic);
        return { followerCount: comic.users.length, followed: !hasUnfollowed };
    }
}
