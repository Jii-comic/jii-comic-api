import { Comic } from "src/comics/entities/comic.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, Index, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index(["comic", "user"], { unique: true })
export class Follower {
    @PrimaryGeneratedColumn("uuid")
    follower_id: string;

    @OneToOne(() => Comic, (comic) => comic.comic_id)
    comic: Comic;

    @OneToOne(() => User)
    user: User;
}
