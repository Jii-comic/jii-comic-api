import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { I18n, I18nContext } from "nestjs-i18n";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UnauthorizedExceptionFilter } from "./filters/unauthorized-exception.filter";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post("/login")
    @UseFilters(new UnauthorizedExceptionFilter())
    async afterLogin(@Request() req) {
        return this.authService.afterLogin(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    // @Get("/profile")
    // getProfile(@Request() req) {
    //     return req.user;
    // }

    @Post("/register")
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
