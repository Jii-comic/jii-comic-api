import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post("/login")
    async afterLogin(@Request() req) {
        return this.authService.afterLogin(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    getProfile(@Request() req) {
        return req.user;
    }

    @Post("/register")
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
}
