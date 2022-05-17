import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth";
import { DatabaseModule } from "./database";
import { i18nModule } from "./i18n";

import { ComicsModule } from "./comics/comics.module";
import { ChaptersModule } from "./chapters/chapters.module";
import { GenresModule } from "./genres/genres.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        i18nModule,
        DatabaseModule,
        AuthModule,
        GenresModule,
        ChaptersModule,
        ComicsModule,
    ],
})
export class AppModule {}
