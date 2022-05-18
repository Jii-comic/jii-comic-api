import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
} from "@nestjs/common";
import { getI18nContextFromRequest } from "nestjs-i18n";
import { ComicsService } from "src/comics/comics.service";

@Injectable()
export class ComicsGuard implements CanActivate {
    constructor(private readonly comicsService: ComicsService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { comicId } = request || {};
        const i18n = getI18nContextFromRequest(request);
        let comic;

        if (!comicId) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            comic = this.comicsService.findOne(comicId);
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        if (!comic) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        return true;
    }
}
