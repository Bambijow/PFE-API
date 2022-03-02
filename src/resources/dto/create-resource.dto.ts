import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

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
    @IsNumber()
    poster: number;
}
