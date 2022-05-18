import { Module } from "@nestjs/common";
import { ChaptersService } from "./chapters.service";
import { ChaptersController } from "./chapters.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Chapter } from "./entities/chapter.entity";
import { ComicsGuard } from "src/guards";
import { ComicsService } from "src/comics/comics.service";
import { ComicsModule } from "src/comics/comics.module";

@Module({
    imports: [TypeOrmModule.forFeature([Chapter]), ComicsModule],
    controllers: [ChaptersController],
    providers: [ChaptersService, ComicsService],
})
export class ChaptersModule {}
