import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserUseCase } from './usecase/user.usecase';
import { UserController } from './presentation/user.controller';
import { UserRepository } from './domain/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../global/jwt/jwt.strategy';

const UserRepositoryFeature = TypeOrmModule.forFeature([UserEntity]);

@Module({
    imports: [
        UserRepositoryFeature,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: 3600 }
            })
        }),
        PassportModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                defaultStrategy: 'jwt'
            })
        })
    ],
    providers: [UserUseCase, UserRepository, JwtStrategy],
    controllers: [UserController],
    exports: [JwtStrategy, PassportModule]
})
export class UserModule {
}
