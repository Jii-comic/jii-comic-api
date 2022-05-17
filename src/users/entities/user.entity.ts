import { Exclude } from "class-transformer";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity() // Init entity and auto generate table in db
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
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
}
