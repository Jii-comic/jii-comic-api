import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { AuthController } from "./auth/auth.controller";
import { AuthModule } from "./auth/auth.module";
import { i18nModule } from "./i18n/i18n.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        i18nModule,
        DatabaseModule,
        AuthModule,
    ],
    controllers: [AppController, AuthController],
    providers: [AppService],
})
export class AppModule {}
