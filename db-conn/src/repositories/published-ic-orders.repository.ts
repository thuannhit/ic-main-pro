import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository
} from 'typeorm';

import { PublishedICOrdersEntity } from '../entities/published_ic_order.entity';

@Injectable()
@EntityRepository(PublishedICOrdersEntity)
export class PublishedICOrdersRepository
    extends Repository<PublishedICOrdersEntity> {
}