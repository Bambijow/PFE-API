import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UserRepository} from "./users.repository";
import {Users} from "./users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtPayload} from "./jwt/jwt-payload.interface";
import {JwtService} from "@nestjs/jwt";
import {BanUserDto} from "./dto/ban-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {

    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        ) {}

    getUsers(filterDto: GetUsersFilterDto): Promise<Users[]> {
        return this.userRepository.getUsers(filterDto);
    }

    getUserResources(id: string) {
        return this.userRepository.getUserResources(id);
    }

    createUser(createUserDto: CreateUserDto) {
        return this.userRepository.createUser(createUserDto);
    }

    async validateUser(
        loginUserDto: LoginUserDto,
    ): Promise<{ accessToken: string }> {
        try {
            const email: string = await this.userRepository.login(loginUserDto);
            const payload: JwtPayload = { email };
            const accessToken: string = await this.jwtService.signAsync(payload);
            return { accessToken };
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async banUser(
        banUserDto: BanUserDto,
    ): Promise<Users> {
        return this.userRepository.banUser(banUserDto);
    }
}
