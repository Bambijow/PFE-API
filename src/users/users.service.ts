import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UserRepository} from "./users.repository";
import {Users} from "./users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {JwtPayload} from "./jwt/jwt-payload.interface";
import {JwtService} from "@nestjs/jwt";
import {BanUserDto} from "./dto/ban-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {EditUserEmailDto} from "./dto/edit-user-email.dto";
import {EditUserRoleDto} from "./dto/edit-user-role.dto";
import {EditUserStatusDto} from "./dto/edit-user-status.dto";

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

    async setProfilePicture(id: string, filename: string) {
        try {
            const user = await this.userRepository.findOne(id);
            user.profile_pic = filename;
            return await this.userRepository.save(user);
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async banUser(
        banUserDto: BanUserDto,
    ): Promise<Users> {
        return this.userRepository.banUser(banUserDto);
    }

    async editUserEmail(id: string, editEmailDto: EditUserEmailDto) {
        const { email } = editEmailDto;
        try {
            const user = await this.userRepository.findOne(id);
            user.email = email;
            await this.userRepository.save(user);
            return user;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async editUserRole(id: string, editUserRoleDto: EditUserRoleDto) {
        const { role } = editUserRoleDto;
        try {
            const user = await this.userRepository.findOne(id);
            user.role = role;
            await this.userRepository.save(user);
            return user;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async editUserStatus(id: string, editUserStatusDto: EditUserStatusDto) {
        const { status } = editUserStatusDto;
        try {
            const user = await this.userRepository.findOne(id);
            user.status = status;
            await this.userRepository.save(user);
            return user;
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }
}
