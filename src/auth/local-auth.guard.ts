import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getI18nContextFromRequest } from "nestjs-i18n";

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {}
