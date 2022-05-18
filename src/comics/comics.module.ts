import { Module } from "@nestjs/common";
import { ComicsService } from "./comics.service";
import { ComicsController } from "./comics.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comic } from "./entities/comic.entity";
import { ComicsGuard } from "src/guards";

@Module({
    imports: [TypeOrmModule.forFeature([Comic])],
    controllers: [ComicsController],
    providers: [ComicsService],
    exports: [ComicsService, TypeOrmModule],
})
export class ComicsModule {}
