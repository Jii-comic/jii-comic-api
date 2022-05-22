import { Chapter } from "src/chapters/entities/chapter.entity";
import { Genre } from "src/genres/entities/genre.entity";
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

    @UpdateDateColumn()
    updated_at: Date;

    // One-to-many entity requires many-to-one relation on the other entity
    @OneToMany(() => Chapter, (chapter) => chapter.comic)
    chapters: Chapter[];

    // Many-to-many entity requires @jointable
    @ManyToMany(() => Genre, (genre) => genre.comics)
    @JoinTable()
    genres: Genre[];
}
