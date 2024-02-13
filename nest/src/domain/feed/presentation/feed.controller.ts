import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { FeedUseCase } from '../usecase/feed.usecase';
import { CreateFeedRequest, UpdateFeedRequest } from './dto/request/feed.request.dto';
import { FeedDetailResponse } from './dto/response/feed.response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('feed')
@UseGuards(AuthGuard())
export class FeedController {
    constructor(
        private feedUseCase: FeedUseCase
    ) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    createFeed(@Body() request: CreateFeedRequest) {
        this.feedUseCase.createFeed(request);
    }

    @Get('/:id')
    getFeed(@Param('id') id: number): Promise<FeedDetailResponse> {
        return this.feedUseCase.getFeedDetail(id);
    }

    @Delete('/:id')
    deleteFeed(@Param('id', ParseIntPipe) id: number) {
        return this.feedUseCase.deleteFeed(id);
    }

    @Patch('/:id')
    updateFeed(@Param('id', ParseIntPipe) id: number, @Body() request: UpdateFeedRequest) {
        return this.feedUseCase.updateFeed(id, request);
    }
}
