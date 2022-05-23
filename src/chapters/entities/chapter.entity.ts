import { Comic } from "src/comics/entities/comic.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
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

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Comic, (comic) => comic.chapters)
    comic: Comic;
}
