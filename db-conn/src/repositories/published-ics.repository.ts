import { Injectable } from '@nestjs/common';
import {
    EntityRepository,
    Repository,
    MoreThanOrEqual
} from 'typeorm';

import { PublishedICsEntity } from '../entities/published_ics.entity';

/**
 * Powered by Thuan
 * @author thuan.nguyen
 * @namespace PublishedICsRepository
 * @classname PublishedICsRepository
 **/
@Injectable()
@EntityRepository(PublishedICsEntity)
export class PublishedICsRepository extends Repository<PublishedICsEntity> {

    async getAvailableList(): Promise<PublishedICsEntity[]> {
        const currentDate = new Date().getTime()
        return this.find({
            where: {
                end_date: MoreThanOrEqual(currentDate)
            }
        })
    }
}