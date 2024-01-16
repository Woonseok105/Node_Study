import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { nullable: false, length: 30 })
    accountId: string;

    @Column('varchar', { nullable: false, length: 5 })
    name: string;
}