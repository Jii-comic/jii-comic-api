import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    Request,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { Public } from "src/common";
import { UsersService } from "src/users";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto";
import { UnauthorizedExceptionFilter } from "./filters/unauthorized-exception.filter";
import { LocalAuthGuard } from "./guards";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Public()
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post("/login")
    @UseFilters(new UnauthorizedExceptionFilter())
    // Post login after LocalAuthGuard validation
    async afterLogin(@Request() req) {
        return this.authService.afterLogin(req.user);
    }

    @Public()
    @Post("/register")
    async register(
        @I18n() i18n: I18nContext,
        @Body() registerDto: RegisterDto,
    ) {
        const { email } = registerDto;
        const existedUser = await this.usersService.findOneByEmail(email);
        if (existedUser) {
            return new BadRequestException(
                await i18n.t("auth.EMAIL_EXISTED"),
            ).getResponse();
        }

        await this.authService.register(registerDto);
        return {
            message: await i18n.t("auth.REGISTER_OK"),
        };
    }
}
