import { Module } from "@nestjs/common";
import { I18nModule } from "nestjs-i18n";
import * as path from "path";

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: "vi",
            loaderOptions: {
                path: path.join(__dirname),
                watch: true,
            },
        }),
    ],
})
export class i18nModule {}
