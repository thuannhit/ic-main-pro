import { Allow } from 'class-validator';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace published_ics
 * @classname UserTokenEntity
 **/
@Entity({ name: 'published_ics' })
export class PublishedICsEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('bigint')
    _ic_product_id: number;

    @Column('int')
    published_amount: number;

    @Column('bigint')
    published_date: number;

    @Column('bigint')
    end_date: number;

    @Column('bigint')
    published_price: number;

    @Column('bigint', { nullable: true })
    published_by: number;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @UpdateDateColumn({ nullable: false })
    updated_at: Date;

}