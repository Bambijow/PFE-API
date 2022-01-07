import { Injectable } from '@nestjs/common';
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UserRepository} from "./users.repository";
import {Users} from "./users.entity";

@Injectable()
export class UsersService {

    constructor(private userRepository: UserRepository) {}

    getUsers(filterDto: GetUsersFilterDto): Promise<Users[]> {
        return this.userRepository.getUsers(filterDto);
    }
}
