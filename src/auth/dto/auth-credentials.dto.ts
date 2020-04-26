import { IsNotEmpty, MinLength, IsString, Matches } from 'class-validator';
export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    username: string;
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'password too weak' },
    )
    password: string;
}