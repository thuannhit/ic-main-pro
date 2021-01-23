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
 * @namespace companies
 * @classname UserTokenEntity
 **/
@Entity({ name: 'companies' })
export class CompanyEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('varchar')
    company_name: string;

    @Column('varchar')
    address: string;

    @Column('varchar')
    tax_code: string;

    @Column('tinyint')
    status: number;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @UpdateDateColumn({ nullable: false })
    updated_at: Date;

}