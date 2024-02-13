import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/domain/user.entity';

@Entity()
export class FeedEntity {
    constructor(title: string, content: string, user: UserEntity) {
        this.title = title;
        this.content = content;
        this.user = user;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    title: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    content: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}