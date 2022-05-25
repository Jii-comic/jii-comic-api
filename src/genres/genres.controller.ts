import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    BadRequestException,
    HttpStatus,
    UseGuards,
    Query,
} from "@nestjs/common";
import { GenresService } from "./genres.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { I18n, I18nContext } from "nestjs-i18n";
import { ILike, Like } from "typeorm";

@Controller("genres")
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Post()
    async create(
        @I18n() i18n: I18nContext,
        @Body() createGenreDto: CreateGenreDto,
    ) {
        try {
            const genre = await this.genresService.create(createGenreDto);
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("genre.CREATE_OK"),
                data: genre,
            };
        } catch (err) {
            throw new BadRequestException(await i18n.t("genre.CREATE_FAILED"));
        }
    }

    @Get()
    async findAll(@Query("query") query: string) {
        return await this.genresService.findAll(
            query && {
                where: { name: ILike(`%${query}%`) },
            },
        );
    }

    @Get(":id")
    async findOne(@I18n() i18n: I18nContext, @Param("id") id: string) {
        try {
            return this.genresService.findOne(id);
        } catch (err) {
            throw new BadRequestException(await i18n.t("genre.NOT_FOUND"));
        }
    }

    @Patch(":id")
    async update(
        @I18n() i18n: I18nContext,
        @Param("id") id: string,
        @Body() updateGenreDto: UpdateGenreDto,
    ) {
        // TODO: Check for existence
        try {
            const genre = await this.genresService.findOne(id);
            if (!genre) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("genre.NOT_FOUND"));
        }

        try {
            const updatedGenre = await this.genresService.update(
                id,
                updateGenreDto,
            );
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("genre.UPDATE_OK"),
                data: updatedGenre,
            };
        } catch (err) {
            throw new BadRequestException(await i18n.t("genre.UPDATE_FAILED"));
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: string, @I18n() i18n: I18nContext) {
        // TODO: Check for existence
        try {
            const genre = await this.genresService.findOne(id);
            if (!genre) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("genre.NOT_FOUND"));
        }

        try {
            await this.genresService.remove(id);
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("genre.REMOVE_OK"),
            };
        } catch (err) {
            console.error(err);
            throw new BadRequestException(await i18n.t("genre.REMOVE_FAILED"));
        }
    }
}
