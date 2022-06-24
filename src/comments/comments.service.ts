import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comic } from "src/comics/entities/comic.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentsRepository: Repository<Comment>,
    ) {}

    async create(createCommentDto: CreateCommentDto, comic: Comic, user: User) {
        const newComment = this.commentsRepository.create({
            ...createCommentDto,
            comic,
            user,
        });

        return await this.commentsRepository.save(newComment);
    }

    async findAllInComic(comicId: string) {
        return await this.commentsRepository.find({
            where: { comic: { comic_id: comicId } },
            relations: ["user"],
        });
    }

    // findOne(id: string) {
    //     return `This action returns a #${id} comment`;
    // }

    async update(id: string, updateCommentDto: UpdateCommentDto) {
        return await this.commentsRepository.save({
            comment_id: id,
            ...updateCommentDto,
        });
    }

    async remove(id: string) {
        await this.commentsRepository.delete(id);

        return true;
    }
}
