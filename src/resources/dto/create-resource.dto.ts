import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";
import { Users } from "src/users/users.entity";

export class CreateResourceDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty({ required: false })
    @Type(() => String)
    @IsOptional()
    filesPath: string[];

    @ApiProperty()
    @Type(() => String)
    categories: string[];

    @ApiProperty()
    poster: Users;
}
