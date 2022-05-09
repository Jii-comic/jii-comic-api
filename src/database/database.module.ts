import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("POSTGRES_HOST") || "host",
                port: configService.get("POSTGRES_PORT") || 5432,
                username: configService.get("POSTGRES_USER") || "admin",
                password: configService.get("POSTGRES_PASSWORD") || "admin",
                database: configService.get("POSTGRES_DB") || "jii-comi",
                entities: [__dirname + "/../**/*.entity.ts"],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
