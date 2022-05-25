import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    BadRequestException,
    UseGuards,
    Request,
    Query,
} from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { JwtAuthGuard } from "src/auth";
import { FollowersService } from "src/followers/followers.service";
import { UsersService } from "src/users";
import { ILike, Like } from "typeorm";
import { ComicsService } from "./comics.service";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";

@Controller("comics")
export class ComicsController {
    constructor(private readonly comicsService: ComicsService) {}

    @Post()
    async create(
        @I18n() i18n: I18nContext,
        @Body() createComicDto: CreateComicDto,
    ) {
        try {
            const comic = await this.comicsService.create(createComicDto);
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("comic.CREATE_OK"),
                data: comic,
            };
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.CREATE_FAILED"));
        }
    }

    @Get()
    async findAll(@Query("query") query: string) {
        return await this.comicsService.findAll(
            query && {
                where: {
                    name: ILike(`%${query}%`),
                },
            },
        );
    }

    @Get(":id")
    async findOne(@I18n() i18n: I18nContext, @Param("id") id: string) {
        try {
            return this.comicsService.findOne(id);
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }
    }

    @Get(":id/follow")
    @UseGuards(JwtAuthGuard)
    async isFollow(
        @I18n() i18n: I18nContext,
        @Param("id") comicId: string,
        @Request() req,
    ) {
        const { user } = req;
        let comic;
        // TODO: Check for existence
        try {
            comic = await this.comicsService.findOne(comicId);
            if (!comic) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            return await this.comicsService.checkFollow(comicId, user);
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    @Post(":id/follow")
    @UseGuards(JwtAuthGuard)
    async follow(
        @I18n() i18n: I18nContext,
        @Param("id") comicId: string,
        @Request() req,
    ) {
        const { user } = req;
        let comic;
        // TODO: Check for existence
        try {
            comic = await this.comicsService.findOne(comicId);
            if (!comic) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            return await this.comicsService.follow(comicId, user);
        } catch (err) {
            console.log(err);
            throw new BadRequestException();
        }
    }

    @Patch(":id")
    async update(
        @I18n() i18n: I18nContext,
        @Param("id") id: string,
        @Body() updateComicDto: UpdateComicDto,
    ) {
        // TODO: Check for existence
        try {
            const comic = await this.comicsService.findOne(id);
            if (!comic) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            const updatedComic = await this.comicsService.update(
                id,
                updateComicDto,
            );
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("comic.UPDATE_OK"),
                data: updatedComic,
            };
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.UPDATE_FAILED"));
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: string, @I18n() i18n: I18nContext) {
        // TODO: Check for existence
        try {
            const comic = await this.comicsService.findOne(id);
            if (!comic) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            await this.comicsService.remove(id);
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("comic.REMOVE_OK"),
            };
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.REMOVE_FAILED"));
        }
    }
}
