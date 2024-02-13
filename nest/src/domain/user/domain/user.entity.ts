import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['accountId'])
export class UserEntity {
    constructor(accountId: string, password: string, name: string) {
        this.accountId = accountId
        this.password = password
        this.name = name
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15, nullable: false })
    accountId: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', length: 5, nullable: false })
    name: string;
}