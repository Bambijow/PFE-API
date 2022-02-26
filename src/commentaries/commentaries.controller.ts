import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {Commentaries} from "./commentaries.entity";
import {GetCommentariesDto} from "./dto/get-commentaries.dto";
import {CommentariesService} from "./commentaries.service";
import {CreateCommentaryDto} from "./dto/create-commentary.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('commentaries')
@ApiTags('commentaries')
export class CommentariesController {

    constructor(private commentariesService: CommentariesService) {}

    @Get()
    getCommentaries(@Query() getCommentariesDto: GetCommentariesDto): Promise<Commentaries[]> {
        return this.commentariesService.getCommentaries(getCommentariesDto);
    }

    @Post()
    createCommentary(@Body() createCommentary: CreateCommentaryDto): Promise<Commentaries> {
        return this.commentariesService.createCommentary(createCommentary);
    }

}
