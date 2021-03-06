import {
    Body,
    Controller, Delete,
    Get,
    Logger,
    Param,
    Patch,
    Post,
    Query,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateResourceDto} from "./dto/create-resource.dto";
import {ResourcesService} from "./resources.service";
import {Resources} from "./resources.entity";
import {ApiTags} from "@nestjs/swagger";
import {GetResourceDto} from "./dto/get-resources.dto";
import {Users} from "../users/users.entity";
import {GetUser} from "../users/get-users.decorator";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, fileFilter} from "./utils/file-upload.utils";
import {diskStorage} from "multer";
import { editResourceDto } from './dto/edit-resource.dto';

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
        Logger.log("creating resource")
        return this.resourceService.createResource(createResourceDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    deleteResource(@Param('id') id: string) {
        return this.resourceService.deleteResource(id);
    }

    @Post('file/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: editFileName,
            }),
            fileFilter: fileFilter
        })
    )
    async uploadFile(@UploadedFile() file) {
        return {
            originalname: file.originalname,
            filename: file.filename,
        };
    }

    @Get('getfile/:path')
    getUploadedFile(@Param('path') path, @Res() res) {
        return res.sendFile(path, { root: './files'});
    }

    @Patch('setactive/:id')
    setActive(@Param('id') id: string) {
        return this.resourceService.setActive(id);
    }

    @Patch('views/increment/:id')
    incrementViews(@Param('id') id: string) {
        return this.resourceService.incrementViews(id);
    }

    @Patch()
    async editResource(@Body() resource: editResourceDto){
        Logger.log("editing resource")
        return {success: await this.resourceService.editResource(resource)}
    }
}
