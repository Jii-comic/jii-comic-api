import { Chapter } from "src/chapters/entities/chapter.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Genre } from "src/genres/entities/genre.entity";
import { UserRating } from "src/user-ratings/entities/user-rating.entity";
import { User } from "src/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comic {
    @PrimaryGeneratedColumn("uuid")
    comic_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    thumbnailUrl: string;

    @Column({ nullable: true })
    coverUrl: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated_at: Date;

    // One-to-many entity requires many-to-one relation on the other entity
    @OneToMany(() => Chapter, (chapter) => chapter.comic)
    chapters: Chapter[];

    @OneToMany(() => Comment, (comment) => comment.comic)
    comments: Comment[];

    @OneToMany(() => UserRating, (rating) => rating.comic)
    ratings: UserRating[];

    // Many-to-many entity requires @jointable
    @ManyToMany(() => Genre, (genre) => genre.comics)
    @JoinTable()
    genres: Genre[];

    @ManyToMany(() => User, (user) => user.comics)
    @JoinTable()
    users: User[];
}
