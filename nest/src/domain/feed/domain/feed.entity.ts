import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeedEntity {
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    content: string;
}