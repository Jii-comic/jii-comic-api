import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/comment.entity";
import { ComicsService } from "src/comics/comics.service";
import { Comic } from "src/comics/entities/comic.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Comic])],
    controllers: [CommentsController],
    providers: [CommentsService, ComicsService],
})
export class CommentsModule {}
