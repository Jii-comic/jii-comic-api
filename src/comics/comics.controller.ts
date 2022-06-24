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
import { User } from "src/users/entities/user.entity";
import { ComicsService } from "./comics.service";
import { CreateComicDto } from "./dto/create-comic.dto";
import { FindAllOptionsDto } from "./dto/find-all-option.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";
import { Comic } from "./entities/comic.entity";

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
    async findAll(@Query() options: FindAllOptionsDto) {
        return await this.comicsService.findAll(options);
    }

    @Get("following")
    @UseGuards(JwtAuthGuard)
    async findAllFollowing(
        @Query() options: FindAllOptionsDto,
        @Request() req,
    ) {
        const user: User = req.user;

        return await this.comicsService.findAll(options, user);
    }

    @Get(":id/check-follow-status")
    @UseGuards(JwtAuthGuard)
    async findOneWithFollowStatus(
        @I18n() i18n: I18nContext,
        @Param("id") comicId: string,
        @Request() req,
    ) {
        const { user } = req;

        try {
            return await this.comicsService.checkFollow(comicId, user);
        } catch (err) {
            console.error(err);
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }
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
    async follow(
        @I18n() i18n: I18nContext,
        @Param("id") comicId: string,
        @Request() req,
    ) {
        const { user } = req;
        let comic: Comic;
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
            return await this.comicsService.follow(comic, user);
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
