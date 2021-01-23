import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository
} from 'typeorm';

import { FinancialStatementEntity } from '../entities/financial-statements.entity';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace FinancialStatementRepository
 * @classname FinancialStatementRepository
 **/
@Injectable()
@EntityRepository(FinancialStatementEntity)
export class FinancialStatementRepository extends Repository<FinancialStatementEntity> {
}