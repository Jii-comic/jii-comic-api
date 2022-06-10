import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Equal, FindManyOptions, In, Like, Repository } from "typeorm";
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

    async findAll(
        options?: FindAllOptionsDto,
        followedUser?: User,
    ): Promise<Comic[]> {
        const query = this.getQueryBuilder()
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
            .orderBy(`comic.${options.orderBy}`, options.order);

        if (followedUser) {
            query
                .leftJoin("comic.users", "user")
                .where("user.user_id = :userId", {
                    userId: followedUser.user_id,
                });
        }
        return await query.getMany();
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
    async checkFollow(comicId: string, user: User): Promise<boolean> {
        return !!(await this.getQueryBuilder()
            .leftJoinAndSelect("comic.users", "user")
            .where("comic.comic_id = :comicId", { comicId })
            .andWhere("user.user_id = :userId", { userId: user.user_id })
            .getOne());
    }

    async follow(
        comic: Comic,
        user: User,
    ): Promise<{ status: "REMOVED" | "FOLLOWED" }> {
        try {
            await this.getQueryBuilder().relation("users").of(comic).add(user);
            return { status: "FOLLOWED" };
        } catch (err) {
            await this.getQueryBuilder()
                .relation("users")
                .of(comic)
                .remove(user);
            return { status: "REMOVED" };
        }
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
}
