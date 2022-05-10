import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { I18nContext } from "nestjs-i18n";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;
        const user = await this.usersService.findOne(email);
        if (user && user.password === password) {
            const { password: userPassword, ...result } = user;
            return result;
        }
        return null;
    }

    async afterLogin(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    register(registerDto: RegisterDto) {
        return {
            registerDto,
        };
    }
}
