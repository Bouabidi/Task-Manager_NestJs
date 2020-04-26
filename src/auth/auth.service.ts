import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService) { }

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(authCredentialDto);
    }
    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialDto);
        if (!username) {
            throw new UnauthorizedException('invalid credentials');
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };

    }
}
