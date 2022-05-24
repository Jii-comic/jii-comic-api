import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                let dbInfo;
                console.log(configService.get("DATABASE_URL"));
                if (configService.get("DATABASE_URL")) {
                    dbInfo = {
                        url: configService.get("DATABASE_URL"),
                    };
                } else {
                    dbInfo = {
                        host: configService.get("DATABASE_HOST") || "host",
                        port: configService.get("DATABASE_PORT") || 5432,
                    };
                }
                return {
                    type: "postgres",
                    ...dbInfo,
                    username: configService.get("DATABASE_USER") || "postgres",
                    password: configService.get("DATABASE_PASSWORD") || "admin",
                    database: configService.get("DATABASE_NAME") || "jii-comic",
                    ssl: true,
                    // Auto import entities
                    // -> No need to import outside `app.module`
                    autoLoadEntities: true,
                    // Auto create schema in db while importing entities
                    synchronize: true,
                };
            },
        }),
    ],
})
export class DatabaseModule {}
