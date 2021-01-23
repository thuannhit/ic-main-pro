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
 * @namespace ic_products
 * @classname ICProductEntity
 **/
@Entity({ name: 'ic_products' })
export class ICProductEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('bigint')
    _company_id: number;

    @Column('varchar')
    name: string;

    @Column('bigint')
    price: number;

    @Column('varchar')
    period: string;

    @Column('double')
    interest_rate: number;

    @Column('tinyint')
    status: number;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @UpdateDateColumn({ nullable: false })
    updated_at: Date;

    @Column('bigint', { nullable: true })
    created_by: number;

    @Column('bigint', { nullable: true })
    updated_by: number;

}