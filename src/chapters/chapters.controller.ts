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
} from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { ComicsService } from "src/comics/comics.service";
import { ComicsGuard } from "src/guards";
import { ChaptersService } from "./chapters.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";

@Controller("comics/:comicId/chapters")
@UseGuards(ComicsGuard)
export class ChaptersController {
    constructor(
        private readonly chaptersService: ChaptersService,
        private readonly comicsService: ComicsService,
    ) {}

    @Post()
    async create(
        @I18n() i18n: I18nContext,
        @Body() createChapterDto: CreateChapterDto,
        @Param("comicId") comicId: string,
    ) {
        try {
            const comic = await this.comicsService.findOne(comicId);
            const chapter = await this.chaptersService.create(
                createChapterDto,
                comic,
            );
            // TODO: Update comic `updated_at` after successfully created chapter
            await this.comicsService.update(comicId, {});

            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("chapter.CREATE_OK"),
                data: chapter,
            };
        } catch (err) {
            throw new BadRequestException(
                await i18n.t("chapter.CREATE_FAILED"),
            );
        }
    }

    @Get()
    findAll(@Param("comicId") comicId: string) {
        return this.chaptersService.findAll(comicId);
    }

    @Get(":id")
    async findOne(
        @I18n() i18n: I18nContext,
        @Param("id") chapterId: string,
        @Param("comicId") comicId: string,
    ) {
        try {
            return await this.chaptersService.findOne(comicId, chapterId, {
                getPrevAndNext: true,
            });
        } catch (err) {
            console.log(err);
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }
    }

    @Patch(":id")
    async update(
        @Param("comicId") comicId: string,
        @Param("id") chapterId: string,
        @Body() updateChapterDto: UpdateChapterDto,
        @I18n() i18n: I18nContext,
    ) {
        // TODO: Check for existence
        try {
            const chapter = await this.chaptersService.findOne(
                comicId,
                chapterId,
            );
            if (!chapter) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }

        try {
            const updatedChapter = await this.chaptersService.update(
                chapterId,
                updateChapterDto,
            );
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("chapter.UPDATE_OK"),
                data: updatedChapter,
            };
        } catch (err) {
            throw new BadRequestException(
                await i18n.t("chapter.UPDATE_FAILED"),
            );
        }
    }

    @Delete(":id")
    async remove(
        @Param("id") chapterId: string,
        @Param("comicId") comicId: string,
        @I18n() i18n: I18nContext,
    ) {
        // TODO: Check for existence
        try {
            const chapter = await this.chaptersService.findOne(
                comicId,
                chapterId,
            );
            if (!chapter) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }

        try {
            await this.chaptersService.remove(chapterId);
            return {
                statusCode: HttpStatus.OK,
                message: await i18n.t("chapter.REMOVE_OK"),
            };
        } catch (err) {
            throw new BadRequestException(
                await i18n.t("chapter.REMOVE_FAILED"),
            );
        }
    }
}
