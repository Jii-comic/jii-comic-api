import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    BadRequestException,
    Request,
} from "@nestjs/common";
import { I18n, I18nContext } from "nestjs-i18n";
import { JwtAuthGuard } from "src/auth";
import { ComicsService } from "src/comics/comics.service";
import { ComicsGuard } from "src/guards";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comics/:comicId/comments")
@UseGuards(ComicsGuard)
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService,
        private readonly comicsService: ComicsService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @Body() createCommentDto: CreateCommentDto,
        @Param("comicId") comicId: string,
        @Request() req,
    ) {
        const { user } = req;
        try {
            const comic = await this.comicsService.findOne(comicId);
            return await this.commentsService.create(
                createCommentDto,
                comic,
                user,
            );
        } catch (err) {
            console.error(err);
            throw new BadRequestException();
        }
    }

    @Get()
    findAll(@Param("comicId") comicId: string) {
        return this.commentsService.findAllInComic(comicId);
    }

    // @Get(":id")
    // findOne(@Param("id") id: string) {
    //     return this.commentsService.findOne(+id);
    // }

    @Patch(":id")
    @UseGuards(JwtAuthGuard)
    update(
        @Param("id") id: string,
        @Body() updateCommentDto: UpdateCommentDto,
    ) {
        return this.commentsService.update(id, updateCommentDto);
    }

    @Delete(":id")
    @UseGuards(JwtAuthGuard)
    remove(@Param("id") id: string) {
        return this.commentsService.remove(id);
    }
}
