import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../domain/repository/user.repository';
import { UserLoginRequest, UserSignUpRequest } from '../presentation/dto/request/user.request.dto';
import { UserEntity } from '../domain/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../presentation/dto/response/user.response.dto';

@Injectable()
export class UserUseCase {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {
    }

    async signUp(request: UserSignUpRequest) {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(request.password, salt);

        try {
            await this.userRepository.saveUser(
                new UserEntity(
                    request.accountId,
                    hashPassword,
                    request.name
                )
            );
        } catch (e) {
            console.log('error', e);
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('User Already Exist');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async login(request: UserLoginRequest): Promise<TokenResponse> {

        const user = await this.userRepository.findOne({
            where: {
                accountId: request.accountId
            }
        });

        if (!await bcrypt.compare(request.password, user.password)) {
            throw new UnauthorizedException('Password Mismatch Exception');
        }

        const payload = { user: user.accountId };
        return { accessToken: await this.jwtService.signAsync(payload) };
    }
}