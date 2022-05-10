import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    UnauthorizedException,
} from "@nestjs/common";
import { Response } from "express";
import { getI18nContextFromArgumentsHost } from "nestjs-i18n";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    async catch(exception: HttpException, host: ArgumentsHost) {
        const i18n = getI18nContextFromArgumentsHost(host);
        const response: Response = host.switchToHttp().getResponse<any>();
        const status = exception.getStatus();

        response.status(status).json({
            ...(<any>exception.getResponse()),
            errors: [await i18n.t("auth.INVALID_LOGIN")],
        });
    }
}
