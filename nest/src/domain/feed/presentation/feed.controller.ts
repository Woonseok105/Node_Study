import {
    Body,
    Controller,
    Delete,
    Get, Logger,
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
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { UserEntity } from '../../user/domain/user.entity';

@Controller('feed')
@UseGuards(AuthGuard())
export class FeedController {
    private logger = new Logger('feed');
    constructor(
        private feedUseCase: FeedUseCase
    ) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    createFeed(@Body() request: CreateFeedRequest, @CurrentUser() user: UserEntity) {
        console.log(user);
        return this.feedUseCase.createFeed(request, user);
    }

    @Get('/:id')
    getFeed(@Param('id') id: number): Promise<FeedDetailResponse> {
        return this.feedUseCase.getFeedDetail(id);
    }

    @Delete('/:id')
    deleteFeed(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: UserEntity) {
        return this.feedUseCase.deleteFeed(id, user);
    }

    @Patch('/:id')
    updateFeed(@Param('id', ParseIntPipe) id: number, @Body() request: UpdateFeedRequest) {
        return this.feedUseCase.updateFeed(id, request);
    }

    @Get()
    getMyFeed(@CurrentUser() user: UserEntity): Promise<FeedDetailResponse[]> {
        this.logger.verbose(`User ${user.accountId} trying to get all boards`);
        return this.feedUseCase.getMyFeed(user);
    }
}
