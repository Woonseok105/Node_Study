import { Module } from '@nestjs/common';
import { FeedController } from './presentation/feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from './domain/feed.entity';
import { FeedUseCase } from './usecase/feed.usecase';
import { FeedRepository } from './domain/repository/feed.repository';

const FeedRepositoryFeature = TypeOrmModule.forFeature([FeedEntity])

@Module({
  imports: [FeedRepositoryFeature],
  exports: [],
  providers: [FeedUseCase, FeedRepository],
  controllers: [FeedController]
})
export class FeedModule {}
