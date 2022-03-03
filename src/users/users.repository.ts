import {EntityRepository, Repository} from "typeorm";
import {Users} from "./users.entity";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {
    BadRequestException,
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";

import * as bcrypt from "bcrypt";
import {UserRoleEnum} from "./enums/user-role.enum";
import {UserStatusEnum} from "./enums/user-status.enum";
import {BanUserDto} from "./dto/ban-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {

    async getUsers(filterDto: GetUsersFilterDto): Promise<Users[]> {
        const { user_id, first_name, last_name, ban } = filterDto;
        const query = this.createQueryBuilder('user');

        if(user_id) query.andWhere('user.user_id LIKE :user_id', { user_id });
        if(first_name) query.andWhere('LOWER(user.first_name) LIKE :first_name', { first_name: `%${first_name.toLowerCase()}%`});
        if(last_name) query.andWhere('LOWER(user.last_name) LIKE :last_name', { last_name: `%${last_name.toLowerCase()}%`});
        if(ban === 0) query.andWhere('user.banned_date IS NULL');
        if(ban > 0) query.andWhere('user.banned_date IS NOT NULL');
        try {
            return await query.getMany();
        } catch(e) {
            throw new InternalServerErrorException();
        }
    }

    async createUser(createUserDto: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const { email, first_name, last_name, password, age } = createUserDto;
        const user = this.create({
            email,
            password: await this.hashPassword(password, salt),
            salt,
            role: UserRoleEnum.ROLE_CITIZEN,
            status: UserStatusEnum.STATUS_AUTHORIZED,
            entry_date: `${Date.now()}`,
            first_name,
            last_name,
            age
        });

        try {
            await this.save(user);
            return { email: user.email, id: user.user_id, role: user.role };
        } catch (error) {
            switch (error.code) {
                case '23505':
                    throw new ConflictException("Email already used");
                default:
                    console.log(error);
                    throw new BadRequestException('Unknown Error');
            }
        }
    }

    private hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async login(loginUserDto: LoginUserDto): Promise<string> {
        const { email, password } = loginUserDto;
        const user = await this.findOne({ email });
        if (user && (await user.validatePassword(password))) return email;
        throw new UnauthorizedException(
            "Mail or password are invalids",
        );
    }

    async banUser(banUserDto: BanUserDto) {
        const { user_id } = banUserDto;
        try {
            const user = await this.findOne(user_id);
            user && user.ban();
            return user;
        } catch(error) {
            throw new NotFoundException(`User with id ${user_id} was not found`);
        }
    }
}
