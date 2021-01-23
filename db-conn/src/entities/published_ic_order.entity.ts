import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'published_ics' })
export class PublishedICOrdersEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('bigint')
    _published_ic_id: number;
    
    @Column('bigint')
    _user_id: number;

    @Column('int')
    amount: number;

    @Column('bigint')
    price: number;

    @Column('bigint')
    date: number;

    @Column('bigint')
    published_by: number;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @UpdateDateColumn({ nullable: false })
    updated_at: Date;
}