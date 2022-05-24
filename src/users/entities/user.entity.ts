import { Exclude } from "class-transformer";
import { Comic } from "src/comics/entities/comic.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity() // Init entity and auto generate table in db
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column({ default: "user" })
    role: "user" | "admin";

    @Column({ default: "" })
    avatarUrl: string;

    @Column()
    @Exclude() // Hide sensitive data
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Comic, (comic) => comic.users, { onDelete: "CASCADE" })
    comics: Comic[];
}
