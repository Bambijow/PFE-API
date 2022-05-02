import {Commentaries} from "./commentaries.entity";
import {EntityRepository, Repository} from "typeorm";
import {GetCommentariesDto} from "./dto/get-commentaries.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {CreateCommentaryDto} from "./dto/create-commentary.dto";

@EntityRepository(Commentaries)

export class CommentariesRepository extends Repository<Commentaries> {

    async getCommentaries(getCommentariesDto: GetCommentariesDto): Promise<Commentaries[]> {
        const { id, resource_id } = getCommentariesDto;
        const query = this.createQueryBuilder('commentaries');
        query.loadAllRelationIds({relations: ['resource']});
        if(id) query.andWhere('commentaries.id = :id', { id });
        if(resource_id) query.andWhere('commentaries.resource = :resource_id', { resource_id });

        try {
            return await query.getMany();
        } catch(error) {
            throw new InternalServerErrorException();
        }
    }

    async createCommentary(createCommentaryDto: CreateCommentaryDto): Promise<Commentaries> {
        const { content, resource, poster } = createCommentaryDto;
        const commentary = this.create({
            content,
            poster,
            resource
        });

        try {
            await this.save(commentary);
            return commentary;
        } catch(error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }
}
