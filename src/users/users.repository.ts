import {EntityRepository, Repository} from "typeorm";
import {Users} from "./users.entity";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {InternalServerErrorException} from "@nestjs/common";

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
}
