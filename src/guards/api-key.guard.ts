import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getI18nContextFromRequest } from "nestjs-i18n";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const i18n = getI18nContextFromRequest(request);

        const { headers } = request;
        const apiKey = headers["api-key"];

        if (apiKey !== this.configService.get<string>("API_KEY")) {
            throw new ForbiddenException();
        }

        return true;
    }
}
