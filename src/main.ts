import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {
    i18nValidationErrorFactory,
    I18nValidationExceptionFilter,
} from "nestjs-i18n";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Global pipe for validation
    app.useGlobalPipes(
        new ValidationPipe({
            stopAtFirstError: true,
            exceptionFactory: i18nValidationErrorFactory,
        }),
    );

    // Global filter for i18n DTO validation
    app.useGlobalFilters(
        new I18nValidationExceptionFilter({ detailedErrors: false }),
    );

    // Swagger API documentation
    const config = new DocumentBuilder().build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    const configService = app.get(ConfigService);
    await app.listen(configService.get("PORT") || 5000);
}
bootstrap();
