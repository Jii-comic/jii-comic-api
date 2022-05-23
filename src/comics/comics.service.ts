import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
    async create(createComicDto: CreateComicDto) {
        const comic = this.comicRepository.create(createComicDto);
        return await this.comicRepository.save(comic);
    }

    async findAll(): Promise<Comic[]> {
        return await this.comicRepository.find({ relations: ["genres"] });
    }

    async findOne(id: string): Promise<Comic> {
        return await this.comicRepository.findOne(id, {
            relations: ["genres", "chapters"],
        });
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
}
