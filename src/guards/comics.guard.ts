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
        const req = context.switchToHttp().getRequest();
        const { comicId } = req.params || {};

        const i18n = getI18nContextFromRequest(req);
        let comic;

        if (!comicId) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        try {
            comic = await this.comicsService.findOne(comicId);
        } catch (err) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        if (!comic) {
            throw new BadRequestException(await i18n.t("comic.NOT_FOUND"));
        }

        req.comic = comic;
        return true;
    }
}
