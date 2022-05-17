import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule, JwtAuthGuard } from "./auth";
import { DatabaseModule } from "./database";
import { i18nModule } from "./i18n";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        i18nModule,
        DatabaseModule,
        AuthModule,
    ],
})
export class AppModule {}
