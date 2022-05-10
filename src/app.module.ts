import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { I18nModule } from "nestjs-i18n";
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        I18nModule.forRoot({
            fallbackLanguage: "vi",
            loaderOptions: {
                path: path.join(__dirname, "/i18n/"),
                watch: true,
            },
        }),
        DatabaseModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {}
