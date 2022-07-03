import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsOptional, IsPositive, IsString} from "class-validator";
import {Type} from "class-transformer";
import { Users } from "src/users/users.entity";

export class editResourceDto {

    @ApiProperty()
    @IsNumber()
    id: number

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
}
