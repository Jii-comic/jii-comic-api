import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const typeOrmConfig = {
                    type: "postgres",
                    host: configService.get("DATABASE_HOST") || "host",
                    port: configService.get("DATABASE_PORT") || 5432,
                    username: configService.get("DATABASE_USER") || "postgres",
                    password: configService.get("DATABASE_PASSWORD") || "admin",
                    database: configService.get("DATABASE_NAME") || "jii-comic",
                    // ssl: true,
                    // Auto import entities
                    // -> No need to import outside `app.module`
                    autoLoadEntities: true,
                    // Auto create schema in db while importing entities
                    synchronize: !(process.env.NODE_ENV === "production"),
                    ssl:
                        process.env.NODE_ENV === "production"
                            ? { rejectUnauthorized: false }
                            : false,
                };

                return <TypeOrmModuleOptions>typeOrmConfig;
            },
        }),
    ],
})
export class DatabaseModule {}
