import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NotEquals } from "class-validator";
import { Comic } from "src/comics/entities/comic.entity";
import { LessThan, MoreThan, Not, Repository } from "typeorm";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Chapter } from "./entities/chapter.entity";

@Injectable()
export class ChaptersService {
    constructor(
        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
    ) {}

    getQueryBuilder() {
        return this.chapterRepository.createQueryBuilder("chapter");
    }

    async create(createChapterDto: CreateChapterDto, comic: Comic) {
        const chapter = this.chapterRepository.create(createChapterDto);
        chapter.comic = comic;
        return await this.chapterRepository.save(chapter);
    }

    async findAll(comicId: string) {
        return await this.chapterRepository.find({
            where: {
                comic: {
                    comic_id: comicId,
                },
            },
            order: {
                created_at: "DESC",
            },
        });
    }

    async findOne(comicId: string, chapterId: string, options?: any) {
        const currentChapter = await this.chapterRepository.findOne({
            where: {
                chapter_id: chapterId,
            },
        });

        if (!options?.getPrevAndNext) {
            return currentChapter;
        }

        // TODO: Get next chapter and previous chapter's id
        const prevChapter = await this.chapterRepository.findOne({
            select: ["chapter_id"],
            where: {
                comic: {
                    comic_id: comicId,
                },
                chapter_id: Not(currentChapter.chapter_id),
                created_at: LessThan(currentChapter.created_at),
            },
            order: {
                created_at: "ASC",
            },
        });
        const nextChapter = await this.chapterRepository.findOne({
            select: ["chapter_id"],
            where: {
                comic: {
                    comic_id: comicId,
                },
                chapter_id: Not(currentChapter.chapter_id),
                created_at: MoreThan(currentChapter.created_at),
            },
            order: {
                created_at: "ASC",
            },
        });

        return {
            currentChapter,
            prevChapter,
            nextChapter,
        };
    }

    async update(id: string, updateChapterDto: UpdateChapterDto) {
        return await this.chapterRepository.save({
            chapter_id: id,
            ...updateChapterDto,
        });
    }

    async remove(id: string) {
        return await this.chapterRepository.delete(id);
    }
}
