import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("POSTGRES_HOST") || "host",
                port: configService.get("POSTGRES_PORT") || 5432,
                username: configService.get("POSTGRES_USER") || "postgres",
                password: configService.get("POSTGRES_PASSWORD") || "admin",
                database: configService.get("POSTGRES_DB") || "jii-comic",
                // Auto import entities
                // -> No need to import outside `app.module`
                autoLoadEntities: true,
                // Auto create schema in db while importing entities
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
