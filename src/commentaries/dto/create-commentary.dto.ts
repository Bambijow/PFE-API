import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {Resources} from "../../resources/resources.entity";
import {Type} from "class-transformer";

export class CreateCommentaryDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Resources)
    resource: Resources;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    poster: number;
}
