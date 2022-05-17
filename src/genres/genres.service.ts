import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { Genre } from "./entities/genre.entity";

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}
    async create(createGenreDto: CreateGenreDto) {
        const genre = this.genreRepository.create(createGenreDto);
        return await this.genreRepository.save(genre);
    }

    async findAll() {
        return await this.genreRepository.find();
    }

    async findOne(id: string) {
        return await this.genreRepository.findOne(id);
    }

    async update(id: string, updateGenreDto: UpdateGenreDto) {
        return await this.genreRepository.save({
            genre_id: id,
            ...updateGenreDto,
        });
    }

    async remove(id: string) {
        return await this.genreRepository.delete(id);
    }
}
