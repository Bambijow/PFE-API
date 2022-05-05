import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateLikesDto } from './dto/create-likes.dto';
import { GetLikesDto } from './dto/get-likes.dto';
import { Likes } from './likes.entity';
import { LikesService } from './likes.service';

@Controller('likes')
@ApiTags('Likes')
export class LikesController {

    constructor(private likesService: LikesService){}
    
    @Get()
    getLikes(@Query() getLikesDto: GetLikesDto): Promise<Likes[]> {
        return this.likesService.getLikes(getLikesDto);
    }

    @Post()
    createCommentary(@Body() createLike: CreateLikesDto): Promise<Likes> {
        return this.likesService.createLike(createLike);
    }

    @Delete(":resource/:user")
    deleteLike(@Param("resource")resource: number, @Param("user") user: number){
        return this.likesService.deleteLike(resource, user)
    }
}
