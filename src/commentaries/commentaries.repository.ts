import {Commentaries} from "./commentaries.entity";
import {EntityRepository, Repository} from "typeorm";
import {GetCommentariesDto} from "./dto/get-commentaries.dto";
import {InternalServerErrorException} from "@nestjs/common";
import {CreateCommentaryDto} from "./dto/create-commentary.dto";
import {Users} from "../users/users.entity";
import { UpdateComDto } from "./dto/update-com.dto";
import { DeleteCommDto } from "./dto/delete-commentary.dto";

@EntityRepository(Commentaries)

export class CommentariesRepository extends Repository<Commentaries> {
    async updateCommentary(updatedCom: UpdateComDto) {
        const query = this.createQueryBuilder("commentaries").update()
        return query.set({content: updatedCom.content})
        .where("id = :id", {id: updatedCom.id})
        .execute();
    }

    async deleteCommentary(commentaryId: number) {
        const query = this.createQueryBuilder("commentaries").delete()
        return query.where("id = :id", {id: commentaryId}).execute()
    }

    async getCommentaries(getCommentariesDto: GetCommentariesDto): Promise<Commentaries[]> {
        const { id, resource_id } = getCommentariesDto;
        const query = this.createQueryBuilder('commentaries');
        query.loadAllRelationIds({relations: ['resource']});
        if(id) query.andWhere('commentaries.id = :id', { id });
        if(resource_id) query.andWhere('commentaries.resource = :resource_id', { resource_id });

        try {
            return await query.getMany();
        } catch(error) {
            console.log(error);
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
