import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth";
import { DatabaseModule } from "./database";
import { i18nModule } from "./i18n";

import { ComicsModule } from "./comics/comics.module";
import { ChaptersModule } from "./chapters/chapters.module";
import { GenresModule } from "./genres/genres.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { UploadModule } from "./upload/upload.module";
import { CommentsModule } from "./comments/comments.module";
import { APP_GUARD } from "@nestjs/core";
import { ApiKeyGuard } from "./guards/api-key.guard";

@Module({
    providers: [
        // Global guard for api key
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard,
        },
    ],
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        i18nModule,
        DatabaseModule,
        AuthModule,
        UploadModule,
        GenresModule,
        ChaptersModule,
        ComicsModule,
        CloudinaryModule,
        CommentsModule,
    ],
})
export class AppModule {}
