import { Comic } from "src/comics/entities/comic.entity";
import { User } from "src/users/entities/user.entity";

export class CreateFollowerDto {
    comic: Comic;
    user: User;
}
