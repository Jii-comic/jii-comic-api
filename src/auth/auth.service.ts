import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/entities/user.entity";
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
        const user: User = await this.usersService.findOneByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async validateRefreshTokenPayload(payload: any): Promise<User> {
        const { user_id, email } = payload;
        if (!user_id || !email) {
            throw new UnauthorizedException();
        }

        const user: User = await this.usersService.findOne(user_id);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async afterLogin(user: User) {
        const { email, user_id } = user;
        const payload = { email, user_id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto): Promise<User> {
        return await this.usersService.create(registerDto);
    }
}
