import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../users.repository';
import { JwtPayload } from './jwt-payload.interface';
import { Users } from '../users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            secretOrKey: 'secretForJWT',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload): Promise<Users> {
        const { email } = payload;
        const user: Users = await this.userRepository.createQueryBuilder('user').andWhere('user.email = :email', { email }).getOne();
        if (!user) throw new UnauthorizedException();
        return user;
    }
}
