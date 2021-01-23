import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace financial_statements
 * @classname FinancialStatementEntity
 **/
@Entity({ name: 'financial_statements' })
export class FinancialStatementEntity {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    _id: number;

    @Column('bigint')
    _user_id: number;

    @Column('bigint')
    date: number;

    @Column('bigint')
    amount: number;

    @Column('bigint')
    balance: number;

    @Column('tinyint')
    action: number;

    @Column('varchar')
    note: string;

    @Column('tinyint')
    financial_statement_group: number;

    @CreateDateColumn({ nullable: false })
    created_at: Date;

    @Column('bigint', { nullable: true })
    created_by: number;
}