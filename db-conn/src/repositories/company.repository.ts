import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository
} from 'typeorm';

import { CompanyEntity } from '../entities/company.entity';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace CompanyRepository
 * @classname CompanyRepository
 **/
@Injectable()
@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
}