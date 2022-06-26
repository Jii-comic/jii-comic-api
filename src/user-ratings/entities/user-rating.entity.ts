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
export class UserRating {
    @PrimaryGeneratedColumn("uuid")
    rating_id: string;

    @Column({ type: "float" })
    rating_score: number;

    @Column({ default: "" })
    content: string;

    @ManyToOne(() => User, (user) => user.ratings)
    user: User;

    @ManyToOne(() => Comic, (comic) => comic.ratings)
    comic: Comic;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
