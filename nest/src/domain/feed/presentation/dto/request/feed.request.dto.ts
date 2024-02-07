import { IsNotEmpty } from 'class-validator';

export class CreateFeedRequest {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    content: string;
}

export class UpdateFeedRequest {
    title: string;

    content: string;
}