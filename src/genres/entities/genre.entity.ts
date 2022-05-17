import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn("uuid")
    genre_id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
}
