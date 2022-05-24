import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFollowerDto } from "./dto/create-follower.dto";
import { UpdateFollowerDto } from "./dto/update-follower.dto";
import { Follower } from "./entities/follower.entity";

@Injectable()
export class FollowersService {
    constructor(
        @InjectRepository(Follower)
        private followerRepository: Repository<Follower>,
    ) {}

    async create(createFollowerDto: CreateFollowerDto) {
        const follower = this.followerRepository.create(createFollowerDto);
        return await this.followerRepository.save(follower);
    }

    findAll() {
        return `This action returns all followers`;
    }

    async findOne(createFollowerDto: CreateFollowerDto) {
        return await this.followerRepository.findOne(createFollowerDto);
    }

    update(id: number, updateFollowerDto: UpdateFollowerDto) {
        return `This action updates a #${id} follower`;
    }

    remove(id: number) {
        return `This action removes a #${id} follower`;
    }
}
