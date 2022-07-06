import { Injectable } from '@nestjs/common';
import { GetCommentariesDto } from "./dto/get-commentaries.dto";
import { Commentaries } from "./commentaries.entity";
import { CommentariesRepository } from "./commentaries.repository";
import { CreateCommentaryDto } from "./dto/create-commentary.dto";
import { UpdateComDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-commentary.dto';

@Injectable()
export class CommentariesService {
    constructor(private commentariesRepository: CommentariesRepository) {}

    async updateCommentary(updatedCom: UpdateComDto): Promise<boolean> {
        return (await this.commentariesRepository.updateCommentary(updatedCom)).affected != 0;
    }

    async deleteCommentary(commenaryId: number): Promise<boolean> {
        return (await this.commentariesRepository.deleteCommentary(commenaryId)).affected != 0;
    }

    getCommentaries(getCommentariesDto: GetCommentariesDto): Promise<Commentaries[]> {
        return this.commentariesRepository.getCommentaries(getCommentariesDto);
    }

    createCommentary(createCommentaryDto: CreateCommentaryDto): Promise<Commentaries> {
        return this.commentariesRepository.createCommentary(createCommentaryDto);
    }
}
