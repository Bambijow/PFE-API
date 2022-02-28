import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {CreateResourceDto} from "./dto/create-resource.dto";
import {ResourcesService} from "./resources.service";
import {Resources} from "./resources.entity";
import {ApiTags} from "@nestjs/swagger";
import {GetResourceDto} from "./dto/get-resources.dto";

@Controller('resources')
@ApiTags('resources')
export class ResourcesController {

    constructor(private resourceService : ResourcesService) {}

    @Get()
    getResources(@Query() getResourceDto: GetResourceDto): Promise<Resources[]> {
        return this.resourceService.getResources(getResourceDto);
    }

    @Post('')
    createResource(@Body() createResourceDto: CreateResourceDto): Promise<Resources> {
        return this.resourceService.createResource(createResourceDto);
    }
}
