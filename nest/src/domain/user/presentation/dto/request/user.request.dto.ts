import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserSignUpRequest {

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    accountId: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

    @MaxLength(5)
    @IsNotEmpty()
    name: string;
}

export class UserLoginRequest {

    @IsString()
    @MinLength(6)
    @MaxLength(15)
    accountId: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;
}