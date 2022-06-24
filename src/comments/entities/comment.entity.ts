import { Comic } from "src/comics/entities/comic.entity";
import { User } from "src/users/entities/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn("uuid")
    comment_id: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Comic, (comic) => comic.comments, { onDelete: "CASCADE" })
    comic: Comic;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
