import {Body, Controller, Get, Post, Query, UseGuards} from '@nestjs/common';
import {CreateResourceDto} from "./dto/create-resource.dto";
import {ResourcesService} from "./resources.service";
import {Resources} from "./resources.entity";
import {ApiTags} from "@nestjs/swagger";
import {GetResourceDto} from "./dto/get-resources.dto";
import {Users} from "../users/users.entity";
import {GetUser} from "../users/get-users.decorator";
import {AuthGuard} from "@nestjs/passport";

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {

    constructor(private resourceService : ResourcesService) {}

    @Get()
    getResources(@Query() getResourceDto: GetResourceDto): Promise<Resources[]> {
        return this.resourceService.getResources(getResourceDto);
    }

    @Post('')
    @UseGuards(AuthGuard('jwt'))
    createResource(@Body() createResourceDto: CreateResourceDto, @GetUser() user: Users): Promise<Resources> {
        return this.resourceService.createResource(createResourceDto, user);
    }
}
