import { Comic } from "src/comics/entities/comic.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn("uuid")
    genre_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Comic, (comic) => comic.genres)
    comics: Comic[];
}
