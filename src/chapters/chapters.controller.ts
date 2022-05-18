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
import { ComicsGuard } from "src/guards";
import { ChaptersService } from "./chapters.service";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";

@Controller("comics/:comicId/chapters")
@UseGuards(ComicsGuard)
export class ChaptersController {
    constructor(private readonly chaptersService: ChaptersService) {}

    @Post()
    async create(
        @I18n() i18n: I18nContext,
        @Body() createChapterDto: CreateChapterDto,
    ) {
        try {
            const chapter = await this.chaptersService.create(createChapterDto);
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
    findAll() {
        return this.chaptersService.findAll();
    }

    @Get(":id")
    async findOne(@I18n() i18n: I18nContext, @Param("id") id: string) {
        try {
            return await this.chaptersService.findOne(id);
        } catch (err) {
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateChapterDto: UpdateChapterDto,
        @I18n() i18n: I18nContext,
    ) {
        // TODO: Check for existence
        try {
            const chapter = await this.chaptersService.findOne(id);
            if (!chapter) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }

        try {
            const updatedChapter = await this.chaptersService.update(
                id,
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
    async remove(@Param("id") id: string, @I18n() i18n: I18nContext) {
        // TODO: Check for existence
        try {
            const chapter = await this.chaptersService.findOne(id);
            if (!chapter) {
                throw new Error();
            }
        } catch (err) {
            throw new BadRequestException(await i18n.t("chapter.NOT_FOUND"));
        }

        try {
            await this.chaptersService.remove(id);
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
