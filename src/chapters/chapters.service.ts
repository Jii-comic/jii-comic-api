import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comic } from "src/comics/entities/comic.entity";
import { Repository } from "typeorm";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Chapter } from "./entities/chapter.entity";

@Injectable()
export class ChaptersService {
    constructor(
        @InjectRepository(Chapter)
        private chapterRepository: Repository<Chapter>,
    ) {}
    async create(createChapterDto: CreateChapterDto, comic: Comic) {
        const chapter = this.chapterRepository.create(createChapterDto);
        chapter.comic = comic;
        return await this.chapterRepository.save(chapter);
    }

    async findAll() {
        return await this.chapterRepository.find();
    }

    async findOne(id: string) {
        return await this.chapterRepository.findOne(id, {
            relations: ["comic"],
        });
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
