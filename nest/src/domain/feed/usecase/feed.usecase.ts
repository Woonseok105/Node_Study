import { Injectable, NotFoundException } from '@nestjs/common';
import { FeedRepository } from '../domain/repository/feed.repository';
import { CreateFeedRequest, UpdateFeedRequest } from '../presentation/dto/request/feed.request.dto';
import { FeedEntity } from '../domain/feed.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedDetailResponse } from '../presentation/dto/response/feed.response.dto';

@Injectable()
export class FeedUseCase {
    constructor(
        @InjectRepository(FeedRepository)
        private feedRepository: FeedRepository
    ) {
    }

    async createFeed(request: CreateFeedRequest) {
        await this.feedRepository.saveFeed(
            new FeedEntity(
                request.title,
                request.content
            )
        );
    }

    async getFeedDetail(feedId: number): Promise<FeedDetailResponse> {
        const feed = await this.feedRepository.queryFeedById(feedId);

        if (!feed) {
            throw new NotFoundException(`Feed Not Found With id ${feedId}`);
        }

        return {
            id: feed.id,
            title: feed.title,
            content: feed.content
        };
    }

    async deleteFeed(feedId: number) {
        const deleteResult = await this.feedRepository.delete(feedId);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Feed Not Found with id ${feedId}`);
        }
    }

    async updateFeed(feedId: number, request: UpdateFeedRequest) {
        const feed = await this.feedRepository.queryFeedById(feedId);

        if (!feed) {
            throw new NotFoundException(`Feed Not Found With id ${feedId}`);
        }

        feed.title = request.title;
        feed.content = request.content;

        await this.feedRepository.save(feed);
    }
}