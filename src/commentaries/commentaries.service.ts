import { Injectable } from '@nestjs/common';
import {GetCommentariesDto} from "./dto/get-commentaries.dto";
import {Commentaries} from "./commentaries.entity";
import {CommentariesRepository} from "./commentaries.repository";
import {CreateCommentaryDto} from "./dto/create-commentary.dto";

@Injectable()
export class CommentariesService {

    constructor(private commentariesRepository: CommentariesRepository) {}

    getCommentaries(getCommentariesDto: GetCommentariesDto): Promise<Commentaries[]> {
        return this.commentariesRepository.getCommentaries(getCommentariesDto);
    }

    createCommentary(createCommentaryDto: CreateCommentaryDto): Promise<Commentaries> {
        return this.commentariesRepository.createCommentary(createCommentaryDto);
    }
}
