import { Comic } from "src/comics/entities/comic.entity";
import { Comment } from "src/comments/entities/comment.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class Chapter {
    @PrimaryGeneratedColumn("uuid")
    chapter_id: string;

    @Column()
    name: string;

    @Column({ type: "jsonb", nullable: true })
    pages: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamp",
        onUpdate: "CURRENT_TIMESTAMP(6)",
    })
    updated_at: Date;

    @OneToMany(() => Comment, (comment) => comment)
    comments: Comment[];

    @ManyToOne(() => Comic, (comic) => comic.chapters)
    comic: Comic;
}
