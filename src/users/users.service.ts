import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
// import { User } from "./user.interface";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;
        const user: User = new User();
        user.email = email;
        user.password = password;

        return await this.usersRepository.save(user);
    }

    findAll() {
        return `This action returns all users`;
    }

    async findOne(id: number): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ email });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
