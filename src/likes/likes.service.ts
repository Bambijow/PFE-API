import { Injectable } from '@nestjs/common';
import { CreateLikesDto } from './dto/create-likes.dto';
import { GetLikesDto } from './dto/get-likes.dto';
import { Likes } from './likes.entity';
import { LikesRepository } from './likes.repository';

@Injectable()
export class LikesService {

    constructor(private repo: LikesRepository){}

    async getLikes(filters: GetLikesDto): Promise<Likes[]>{
        return this.repo.getLikes(filters);
    }

    async createLike(like: CreateLikesDto): Promise<Likes> {
        return this.repo.createLikes(like);
    }

    async deleteLike(resource: number, user){
        let success = await this.repo.deleteLike(resource, user)
        console.log(success);
        return success
        
    }

    async getLikedResources(id: string) {
        return await this.repo.getLikedResources(id);
    }
}
