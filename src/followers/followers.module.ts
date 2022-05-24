import { Module } from "@nestjs/common";
import { FollowersService } from "./followers.service";
import { FollowersController } from "./followers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Follower } from "./entities/follower.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Follower])],
    controllers: [FollowersController],
    providers: [FollowersService],
    exports: [FollowersService, TypeOrmModule],
})
export class FollowersModule {}
