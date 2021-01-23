import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository
} from 'typeorm';

import { ICProductEntity } from '../entities/ic-product.entity';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace ICProductRepository
 * @classname ICProductRepository
 **/
@Injectable()
@EntityRepository(ICProductEntity)
export class ICProductRepository extends Repository<ICProductEntity> {
}