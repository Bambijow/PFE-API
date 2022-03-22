import {Body, Controller, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UsersService} from "./users.service";
import {Users} from "./users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {GetUser} from "./get-users.decorator";
import {AuthGuard} from "@nestjs/passport";

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
}
