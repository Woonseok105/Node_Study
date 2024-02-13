import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserUseCase } from '../usecase/user.usecase';
import { UserLoginRequest, UserSignUpRequest } from './dto/request/user.request.dto';
import { TokenResponse } from './dto/response/user.response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { UserEntity } from '../domain/user.entity';

@Controller('user')
export class UserController {
    constructor(
        private userUseCase: UserUseCase
    ) {
    }

    @Post('/signup')
    signup(@Body(ValidationPipe) request: UserSignUpRequest) {
        return this.userUseCase.signUp(request);
    }

    @Post('/login')
    login(@Body(ValidationPipe) request: UserLoginRequest): Promise<TokenResponse> {
        return this.userUseCase.login(request);
    }

    @Post('/get-user')
    @UseGuards(AuthGuard())
    getUser(@CurrentUser() user: UserEntity) {
        console.log('user', user);
    }
}