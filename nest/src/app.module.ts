import { Module } from '@nestjs/common';
import { FeedModule } from './domain/feed/feed.module';
import { TypeormConfigModule } from './global/config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';

@Module({
    imports: [
        FeedModule,
        TypeormConfigModule,
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ]
})
export class AppModule {
}
