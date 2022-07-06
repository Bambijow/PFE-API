import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {Commentaries} from "./commentaries.entity";
import {GetCommentariesDto} from "./dto/get-commentaries.dto";
import {CommentariesService} from "./commentaries.service";
import {CreateCommentaryDto} from "./dto/create-commentary.dto";
import {ApiParam, ApiTags} from "@nestjs/swagger";
import { UpdateComDto } from './dto/update-com.dto';
import { DeleteCommDto } from './dto/delete-commentary.dto';

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

    @Patch()
    @ApiParam({name: "ID", type: typeof 0})
    updateCommentary(@Body() updatedCom: UpdateComDto){
        return this.commentariesService.updateCommentary(updatedCom)
    }

    @Delete(":id")
    @ApiParam({name: "id"})
    deleteCommentary(@Param("id") commentaryId: number){
        return this.commentariesService.deleteCommentary(commentaryId)
    }

}
