import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedEntity } from '../feed.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FeedRepository extends Repository<FeedEntity> {

    constructor(dataSource: DataSource) {
        super(FeedEntity, dataSource.createEntityManager());
    }

    async saveFeed(feed: FeedEntity) {
        await this.save(feed);
    }

    async queryFeedById(id: number): Promise<FeedEntity> {
        return await this.findOne({ where: { id } });
    }
}