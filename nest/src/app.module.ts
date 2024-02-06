import { Module } from '@nestjs/common';
import { FeedModule } from './domain/feed/feed.module';
import { TypeormConfigModule } from './global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        FeedModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {
}
