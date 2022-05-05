import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateLikesDto } from "./dto/create-likes.dto";
import { GetLikesDto } from "./dto/get-likes.dto";
import { Likes } from "./likes.entity";

@EntityRepository(Likes)
export class LikesRepository extends Repository<Likes> {

    async getLikes(getLikesDto: GetLikesDto): Promise<Likes[]> {
        const { user, ressource: resource, positive } = getLikesDto;
        const query = this.createQueryBuilder('likes');
        query.loadAllRelationIds({relations: ['resource', 'user']});
        if(user) query.andWhere('likes.user = :user', { user });
        if(resource) query.andWhere('likes.resource = :resource', { resource });
        if(positive) query.andWhere('likes.positive = :positive', { positive });

        try {
            return await query.getMany();
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async createLikes(createLikesDto: CreateLikesDto): Promise<Likes> {
        const { user, resource, positive } = createLikesDto;
        const likes = this.create({ user, resource, positive });

        try {
            await this.save(likes);
            return likes;
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteLike(user: number, resource: number){
        return (await this.createQueryBuilder('likes')
        .delete()
        .andWhere("likes.resourceId = :resource", {resource})
        .andWhere("likes.userUserId = :user", {user})
        .execute()).affected != 0
    }
    
    async getLikedResources(id: string) {
        const query = this.createQueryBuilder('likes');
        query.where('likes.user = :id', { id });
        query.innerJoinAndSelect('likes.resource', 'resources');
        try {
            return await query.getMany();
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}
