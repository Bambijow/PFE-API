import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query, Res,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UsersService} from "./users.service";
import {Users} from "./users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {GetUser} from "./get-users.decorator";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, profilePictureFilter} from "../resources/utils/file-upload.utils";
import {diskStorage} from "multer";

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(@Query()  filterDto: GetUsersFilterDto): Promise<Users[]> {
        return this.usersService.getUsers(filterDto);
    }

    @Post('/register')
    //@ApiExcludeEndpoint() // Permets de cacher l'endpoint sur swagger.
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    getUserProfile(@GetUser() user: Users): Users {
        return user;
    }

    @Get('resources/:id')
    @UseGuards(AuthGuard('jwt'))
    getUserResources(@Param('id') id: string): Promise<Users[]> {
        return this.usersService.getUserResources(id);
    }

    @Post('/login')
    loginUser(
        @Body() loginUserDto: LoginUserDto,
    ): Promise<{ accessToken: string }> {
        return this.usersService.validateUser(loginUserDto);
    }

    @Patch('/ban')
    banUser(
        @Body() banUserDto: BanUserDto,
    ): Promise<Users> {
        return this.usersService.banUser(banUserDto);
    }

    @Post('picture/upload/:id')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files/profile_pic',
                filename: editFileName,
            }),
            fileFilter: profilePictureFilter
        })
    )
    async uploadFile(@UploadedFile() file, @Param('id') id: string) {
        await this.usersService.setProfilePicture(id, file.filename);
        return {
            originalname: file.originalname,
            filename: file.filename,
        };
    }

    @Get('picture/:path')
    getUploadedFile(@Param('path') path, @Res() res) {
        return res.sendFile(path, { root: './files/profile_pic'});
    }
}
