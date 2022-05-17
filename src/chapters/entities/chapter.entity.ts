import {
    Column,
    CreateDateColumn,
    Entity,
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
    content: any;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
